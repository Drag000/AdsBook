import Container from 'react-bootstrap/Container';
import { useLogin } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

const initialValues = { email: '', password: '' };

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();

    const loginHandler = async ({ email, password }) => {
        try {
            await login(email, password);

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, loginHandler);


    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            {/* <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div> */}
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            {/* <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p> */}
        </form>

    );
}