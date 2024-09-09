
import { useLogin } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';

const initialValues = { username: '', password: '' };

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();
    const { accessToken, userId } = useContext(AuthContext);
    const [error, setError] = useState('');

    const loginHandler = async ({ username, password }) => {
        try {
            await login(username, password)
            navigate('/');
        } catch (err) {
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.username) {
                    errors.push(`Username: ${err.username.join(' ')}`);
                }
                if (err.password) {
                    errors.push(`Password: ${err.password.join(' ')}`);
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
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, loginHandler);




    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3 className="w-25 m-auto">Log in</h3>

            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Enter username"
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

            <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                {error && error.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Log in
                </button>
            </div>
        </form>
    );
}