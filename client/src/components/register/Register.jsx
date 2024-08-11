import { useRegister } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

const initialValues = { email: '', password: '', 'confirm-password': '' };

export default function Register() {
    const register = useRegister();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const registerHandler = async (values) => {
        if (values.password != values['confirm-password']) {
            return setError('Password missmatch!');
        }

        try {
            await register(values.email, values.password)

            navigate('/');
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, registerHandler);


    return (
        <div>
            <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
                <h3>Sign Up</h3>
                {/* <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}
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
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        value={values['confirm-password']}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>

                {error && (
                    <p> {error} </p>
                )}

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" >
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        </div>
    );
}