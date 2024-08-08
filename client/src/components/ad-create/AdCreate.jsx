import { useNavigate } from "react-router-dom";
import { useCreateAd } from "../../hooks/useAds";
import { useForm } from '../../hooks/useForm';

const initialValues = {
    title: '',
    condition: '',
    location: '',
    price: '',
    description: '',
    imageURL: '',
};

export default function CreateAd() {
    const createAd = useCreateAd();
    const navigate = useNavigate();

    const createAdHandler = async (values) => {
        try{
            await createAd(values);
            navigate('/home');
        } catch (err) {
            console.log(err.message);
        }
    };
    
    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, createAdHandler);

    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3>Create Add</h3>
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
                    Create
                </button>
            </div>
        </form>
    );
}