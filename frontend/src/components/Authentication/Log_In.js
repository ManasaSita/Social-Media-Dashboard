import React, { useState, useEffect } from "react";
import { logInUser, getAuthenticatedUser } from "../../services/authAPI";
import "../../customCSS/Log_In.css";

const LogIn = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    // const [user, setUser] = useState(null); 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const response = await logInUser({ email, password });

        if (response.success) {
            setSuccess("Login successful! 🎉");
        } else {
            setError(response.error);
        }
    };

    useEffect(() => {
        getAuthenticatedUser().then((response) => {
            if (response.success) { 
                // setUser(response.data)
                setSuccess("Login successful! 🎉");
                console.log(response.data);
            } else {
                setError(response.error);
            }
        });
    }, []);

    return (
        <div className="login-container d-flex align-items-center justify-content-center vh-100">
            {/* {user ? (
                <>
                </>
                ) : ( */}
                <div className="login-card p-4">
                    <h1 className="text-center fw-bold app-name">#IQ</h1>
                    {/* {error && <p className="alert alert-danger">{error}</p>} */}
                    {success && <p className="alert alert-success">{success}</p>}

                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                        <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
                    </form>
                    <button><a href="http://localhost:5000/api/auth/google">Login with Google</a></button>
                </div>
            {/* )} */}
        </div>
    );

};

export default LogIn;