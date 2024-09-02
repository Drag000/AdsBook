import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { useUpdatePassword } from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PasswordUpdate() {
    const updatePassword = useUpdatePassword();
    const navigate = useNavigate();
    const { profileId } = useParams();
    const [error, setError] = useState('');

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    }

    const editPasswordHandler = async (values) => {
        if (values.newPassword != values.confirmNewPassword) {
            return setError('Password missmatch!');
        }

        try {
            await updatePassword(profileId, values);
            navigate(`/profile/${profileId}/details/`);
        } catch (err) {
            if (err && typeof err === 'object') {
                const errors = [];

                if (err.old_password) {
                    errors.push(`Old Password: ${err.old_password.join(' ')}`);
                }
                if (err.new_password) {
                    errors.push(`New Password: ${err.new_password.join(' ')}`);
                }

                if (err.non_field_errors) {
                    errors.push(err.non_field_errors.join(' '));
                }

                setError(errors);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }


        }
    };



    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, editPasswordHandler);

    return (
        <div>
            <form className="w-25 m-auto p-3 my-5 border" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label>Old Password*</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your old password"
                    />
                </div>
                <div className="mb-3">
                    <label>New Password*</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your new password"
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password*</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={values.confirmNewPassword}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder="Enter your new password"
                    // ['confirm-password']
                    />
                </div>
                
                <div style={{fontSize: '13px'}}>* Required</div>

                <div>
                    {error && (
                        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}> {error} </p>
                    )}
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}