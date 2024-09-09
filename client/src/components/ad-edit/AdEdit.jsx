import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAd, useUpdateAd } from '../../hooks/useAds'
import { useEffect, useState } from "react";

import { Button, Col, Image } from 'react-bootstrap';

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
    };


    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3>Edit Add</h3>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    name="title"
                    value={values.title}
                    onChange={changeHandler}
                />
            </div>
            <div className="mb-3">
                <label>Condition</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="condition"
                    value={values.condition}
                    onChange={changeHandler}
                />
            </div>
            <div className="mb-3">
                <label>Location</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder=" "
                    name="location"
                    value={values.location}
                    onChange={changeHandler}
                />
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder=" "
                    name="price"
                    value={values.price}
                    onChange={changeHandler}
                />
            </div>
            <div className="mb-3">
                <label>Description</label>
                <textarea
                    type="textarea"
                    className="form-control"
                    placeholder="Please describe.."
                    name="description"
                    value={values.description}
                    onChange={changeHandler}
                />
            </div>
            {/* <div className="mb-3">
                <label>Photo</label>
                <input
                    type="url"
                    className="form-control"
                    placeholder="Please add url"
                    name="photo"
                    value={values.photo}
                    onChange={changeHandler}
                />
            </div> */}

            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Main photo</label>
                <input
                    id="formFile"
                    type="file"
                    className="form-control"
                    placeholder=" "
                    name="main_photo"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                />
            </div>
            {/* Display existing photos with delete buttons */}
            <div className="mb-3">
                <label>Current Photos</label>
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
            </div>

            {/* Input to upload new photos */}
            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Add New Photos</label>
                <input
                    id="formFileMultiple"
                    type="file"
                    className="form-control"
                    name="photos"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                />
            </div>


            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </div>
        </form>
    );
}