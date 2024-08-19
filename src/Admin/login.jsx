import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password_hash, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message
    const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
    const navigate = useNavigate(); // Hook for programmatic navigation
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        if (data) {
            setTimeout(() => {
                
                navigate('/dashboard'); 
            }, 100);
        }
    }, [navigate]);
    

    async function loginBtn() {
        console.log(email, password_hash);

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password_hash', password_hash);

        try {
            let response = await fetch('http://localhost/Hotel_reservation/Api_controller/login', {
                method: 'POST',
                body: formData // Send FormData instead of JSON
            });
            let result = await response.json();
            if (result.status === 'success') {
                localStorage.setItem('user-info', JSON.stringify(result));
                navigate('/dashboard'); // Navigate to another page upon successful login
            } else {
                // Handle login failure
                setAlertMessage(result.message); // Use API error message
                if (email === '' && password_hash === '') {
                    setAlertMessage("Enter Emial and password ")
                } else if (password_hash === '') {
                    setAlertMessage("Enter password ")

                }
                setAlertVisible(true);

                // Hide alert after 3 seconds
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error:", error);
            setAlertMessage("An unexpected error occurred."); // Generic error message
            setAlertVisible(true);

            // Hide alert after 3 seconds
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            {alertVisible && (
                                                <div className="alert alert-danger fade-in-out">
                                                    {alertMessage}
                                                </div>
                                            )}
                                            <form className="user">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={loginBtn}
                                                    className="btn btn-primary btn-user btn-block"
                                                >
                                                    Login
                                                </button>
                                                <hr />
                                            </form>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
