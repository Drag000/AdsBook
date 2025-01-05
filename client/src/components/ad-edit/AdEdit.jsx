import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAd, useUpdateAd } from '../../hooks/useAds'
import { useEffect, useState } from "react";

import { Button, Col, Image, Form } from 'react-bootstrap';

export default function AdEdit() {
    const updateAd = useUpdateAd();
    const navigate = useNavigate();
    const { adId } = useParams();
    const [ad] = useGetOneAd(adId);
    const [values, setValues] = useState(ad || {
        title: '',
        condition: '',
        location: '',
        price: '',
        description: '',
        main_photo: null,
        photos: null,
    });

    const [photos, setPhotos] = useState([]);
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (ad) {
            setValues(ad);
            setPhotos(ad.photos || []);
        }
    }, [ad]);

    const changeHandler = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (name === "photos") {
                setNewPhotos([...newPhotos, ...files]);
            } else {
                setValues({ ...values, [name]: files[0] });
            }
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const deletePhotoHandler = (photo) => {
        setDeletedPhotos([...deletedPhotos, photo.pk]);
        setPhotos(photos.filter((p) => p.pk !== photo.pk));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const formData = new FormData();

            for (let key in values) {
                if (key === "main_photo" && (typeof values[key] === 'string') || values[key] === null) {
                    continue
                }
                else {
                    formData.append(key, values[key]);
                }
            }

            if (newPhotos.length > 0) {
                newPhotos.forEach((photo) => {
                    formData.append('photos', photo);
                });
            }

            if (deletedPhotos.length > 0) {
                formData.append('deleted_photos', JSON.stringify(deletedPhotos));
            }

            try {
                await updateAd(adId, formData);
                navigate(`/ads/${adId}/details/`);
            } catch (err) {
                console.log(err.message);
            }
        }
        setValidated(true);
    };


    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate validated={validated} onSubmit={submitHandler} >
            <h3 className="row justify-content-center">Edit Add</h3>

            <Form.Group className="mb-3">
                <Form.Label>Title*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={values.title}
                    onChange={changeHandler}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a title.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Condition*</Form.Label>
                <Form.Select
                    name="condition"
                    value={values.condition}
                    onChange={changeHandler}
                    required
                >
                    <option value="">Select condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Please select a condition.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Location*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={values.location}
                    onChange={changeHandler}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a location.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price*</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={values.price}
                    onChange={changeHandler}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a price.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Please describe..."
                    name="description"
                    value={values.description}
                    onChange={changeHandler}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Main Photo</Form.Label>
                <Form.Control
                    type="file"
                    name="main_photo"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                />
            </Form.Group>

            {/* Display existing photos with delete buttons */}
            <Form.Group className="mb-3">
                <Form.Label>Current Photos</Form.Label>
                <div className="d-flex flex-wrap">
                    {photos.map((photo) => (
                        <Col key={photo.pk} xs={6} md={4} className="position-relative">
                            <Image src={photo.photo_url} rounded alt={`Photo ${photo.pk}`} className="img-thumbnail" />
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0"
                                onClick={() => deletePhotoHandler(photo)}
                            >
                                X
                            </Button>
                        </Col>
                    ))}
                </div>
            </Form.Group>

            {/* Input to upload new photos */}
            <Form.Group className="mb-3">
                <Form.Label>Add New Photos</Form.Label>    
                <Form.Control
                    type="file"
                    name="photos"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                />
                <Form.Text className="text-muted">
                    Add multiple photos by holding "Ctrl" and selecting the photos.
                </Form.Text>
            </Form.Group>

            <div style={{ fontSize: '13px' }}>* Required</div>

            <div className="d-grid gap-2">
                <Button type="submit" variant="primary" className="mt-3">
                    Edit Ad
                </Button>
            </div>

        </Form>
    );
}