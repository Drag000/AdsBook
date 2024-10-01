import { useNavigate } from "react-router-dom";
import { useCreateAd } from "../../hooks/useAds";
import { useState } from 'react';

import { Button, Col, Image, Form } from 'react-bootstrap';

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
    const [validated, setValidated] = useState(false);

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
                console.log(err.message);
            }
        }
        setValidated(true);

    };

    return (
        // <form className="w-25 m-auto p-3 my-5 border needs-validation" onSubmit={submitHandler} noValidate>
        // <form className="w-25 m-auto p-3 my-5 border" validated={validated} onSubmit={submitHandler} noValidate>
        //     <h3 className="row justify-content-center">Create Add</h3>

        //     <div className="mb-3">
        //         <label className="form-label">Title*</label>
        //         <input
        //             type="text"
        //             className="form-control"
        //             placeholder="Enter title"
        //             name="title"
        //             value={values.title}
        //             onChange={changeHandler}
        //             required

        //         />
        //         <div className="invalid-feedback">Please provide a title.</div>
        //     </div>

        <Form className="w-25 m-auto p-3 my-5 border" noValidate validated={validated} onSubmit={submitHandler} >
            <h3 className="row justify-content-center">Create Add</h3>

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
                    <option value="new">New</option>
                    <option value="used">Used</option>
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

            <Form.Group className="mb-3">
                <Form.Label>Photos</Form.Label>
                <Form.Control
                    type="file"
                    name="photos"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                />
            </Form.Group>

            <div style={{ fontSize: '13px' }}>* Required</div>

            <div className="d-grid gap-2">
                <Button type="submit" variant="primary" className="mt-3">
                    Create Ad
                </Button>
            </div>

            {/* <div className="mb-3">
                <label>Condition</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter condition"
                    name="condition"
                    value={values.condition}
                    onChange={changeHandler}
                    required
                />
                <div className="invalid-feedback">Please provide a title.</div>
            </div>

            <div className="mb-3">
                <label>Location*</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    name="location"
                    value={values.location}
                    onChange={changeHandler}
                />
            </div>
            <div className="mb-3">
                <label>Price*</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
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

            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Photos</label>
                <input
                    id="formFileMultiple"
                    type="file"
                    className="form-control"
                    placeholder=" "
                    name="photos"
                    onChange={changeHandler}
                    accept="image/jpeg,image/png,image/gif"
                    multiple
                />
            </div>

            <div style={{ fontSize: '13px' }}>* Required</div>
            <br />
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Create add
                </button>
            </div> */}
        </Form>
    );
}