import { useNavigate, useParams } from "react-router-dom";
import { useGetOneAd } from '../../hooks/useAds'
import { useForm } from '../../hooks/useForm';
import { useMemo, useState, useEffect } from "react";
import * as adsAPI from '../../api/ads-api'

const initialValues = {
    title: '',
    condition: '',
    location: '',
    price: '',
    description: '',
    imageURL: '',
};

export default function AdEdit() {
    // const updateAd = useUpdateAd();
    const navigate = useNavigate();
    const { adId } = useParams();
    const [ad] = useGetOneAd(adId);
    
    const initialFormValues = useMemo(() => Object.assign({}, initialValues, ad),[ad]);
    
    
    const editAdHandler = async (values) => {
        try {
            await adsAPI.updateAd(adId, values);;
            navigate(`/ads/${adId}/details`);
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialFormValues, editAdHandler);

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
            <div className="mb-3">
                <label>Photo</label>
                <input
                    type="url"
                    className="form-control"
                    placeholder="Please add url"
                    name="imageURL"
                    value={values.imageURL}
                    onChange={changeHandler}
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