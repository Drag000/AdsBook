import { useNavigate } from "react-router-dom";
import { useCreateAd } from "../../hooks/useAds";
import { useState } from 'react';



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
    };

    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3 className="row justify-content-center">Create Add</h3>
            <div className="mb-3">
                <label>Title*</label>
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
                    placeholder="Enter condition"
                    name="condition"
                    value={values.condition}
                    onChange={changeHandler}
                />
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
            {/* <div className="mb-3">
                <label>Photo</label>
                <input
                    type="url"
                    className="form-control"
                    placeholder="Add url"
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
            <br/>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Create add
                </button>
            </div>
        </form>
    );
}