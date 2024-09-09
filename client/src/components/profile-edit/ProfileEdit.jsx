import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import { useUpdatePassword, useUpdateProfile } from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";


export default function ProfileEdit() {
    const { userId, username, email, firstName, lastName, changeAuthState, accessToken, isAuthenticated } = useContext(AuthContext);
    const updateProfile = useUpdateProfile();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const currentValues = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
    };

    const editProfileHandler = async (values) => {
        try {
            const result = await updateProfile(userId, values);

            changeAuthState(result)

            navigate(`/profile/${userId}/details`);
        } catch (err) {
            console.log(err)
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.username) {
                    errors.push(`Username: ${err.username.join(' ')}`);
                }
                if (err.password) {
                    errors.push(`Password: ${err.password.join(' ')}`);
                }

                if (err.email) {
                    errors.push(`Email: ${err.email.join(' ')}`);
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
    } = useForm(currentValues, editProfileHandler);


    return (
        <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
            <h3 className="w-25 m-auto">Profile</h3>
            <div className="mb-3">
                <label>Username*</label>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Username"
                />
            </div>

            <div className="mb-3">
                <label>Email*</label>
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="example@gmail.com"
                />
            </div>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="First name"
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="First name"
                />
            </div>

            {/* <div className="mb-3">
            <label>Phone</label>
            <input
                type="tel"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={changeHandler}
                className="form-control"
                placeholder="Please enter your phone number '+359XXXXXXXXX'"
            />
        </div> */}


            <div style={{ fontSize: '13px' }}>* Required</div>

            <div style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                {error && error.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary" >
                    Update
                </button>
            </div>
        </form>
    );
}