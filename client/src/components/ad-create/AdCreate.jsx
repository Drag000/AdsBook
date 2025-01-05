import { useNavigate } from "react-router-dom";
import { useCreateAd } from "../../hooks/useAds";
import { useState } from 'react';

import { Button, Col, Form } from 'react-bootstrap';

const initialValues = {
    title: '',
    condition: '',
    location: '',
    price: '',
    description: '',
    main_photo: null,
    photos: null,
};

export default function CreateAd() {
    const createAd = useCreateAd();
    const navigate = useNavigate();

    const [values, setValues] = useState(initialValues);
    const [newPhotos, setNewPhotos] = useState([]);
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);
    const [priceIsValid, setPriceIsValid] = useState(true);

    const changeHandler = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (name === "photos") {
                setNewPhotos([...newPhotos, ...files]);
            } else {
                setValues({ ...values, [name]: files[0] });
            }
        } else {
            if (name === 'price') {
                const price = parseFloat(value);
                setPriceIsValid(price >= 0);
            }
            setValues({ ...values, [name]: value });
        }
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
                if (key === "main_photo" && ((typeof values[key] === 'string') || (values[key] === null))) {
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

            try {
                await createAd(formData);
                navigate('/');
            } catch (err) {
                if (err && typeof err === 'object') {
                    const errors = [];

                    if (err.title) {
                        errors.push(`Title: ${err.title.join(' ')}`);
                    }
                    if (err.condition) {
                        errors.push(`Condition: ${err.condition.join(' ')}`);
                    }
                    if (err.location) {
                        errors.push(`Location: ${err.location.join(' ')}`);
                    }
                    if (err.price) {
                        errors.push(`Price: ${err.price.join(' ')}`);
                    }
                    if (err.description) {
                        errors.push(`Description: ${err.description.join(' ')}`);
                    }
                    if (err.main_photo) {
                        errors.push(`Main Photo: ${err.main_photo.join(' ')}`);
                    }


                    if (err.non_field_errors) {
                        errors.push(err.non_field_errors.join(' '));
                    }

                    setError(errors);
                    console.log('error', error)
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            }
        }
        setValidated(true);

    };

    return (
        <Form className="w-25 m-auto p-3 my-5 border" noValidate validated={validated} onSubmit={submitHandler} >
            <h3 className="row justify-content-center">Create Add</h3>

            <Form.Group className="mb-3">
                <Form.Label>Title* </Form.Label>
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
                    isInvalid={!priceIsValid}
                    // required
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

            <Form.Group className="mb-3">
                <Form.Label>Photos</Form.Label>
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

            <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                {error && error.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
            </div>

            <div className="d-grid gap-2">
                <Button type="submit" variant="primary" className="mt-3">
                    Create Ad
                </Button>
            </div>
        </Form>
    );
}