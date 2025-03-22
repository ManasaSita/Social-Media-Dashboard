import React, { useState } from 'react';
import { signUpUser, loginWithTwitter, getAuthenticatedUser  } from '../../services/authAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../customCSS/Sign_Up.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const response = await signUpUser({ userName: username, email, password });

        if (response.success) {
            setSuccess("Signup successful! 🎉");
        } else {
            setError(response.error);
        }
    };

    return (
        <div className="signup-container d-flex align-items-center justify-content-center vh-100">
            <div className="signup-card p-4">
                <h1 className="text-center fw-bold app-name">#IQ</h1>
                {error && <p className="alert alert-danger">{error}</p>}
                {success && <p className="alert alert-success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>

                    <p className='mb-10'>Already have an account? <a href='/login'>Login</a></p>
                </form>
                <button><a href="http://localhost:5000/api/auth/google">Login with Google</a></button>
            </div>
        </div>
    );
};

export default SignUp;
