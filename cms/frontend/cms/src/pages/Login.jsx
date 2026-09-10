import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import logo from "../assets/hospital_logo.png";
import { loginUser } from "../services/loginService";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // Empty field validation
        if (!username.trim() || !password.trim()) {

            setError("Please enter username and password.");

            return;
        }

            if (username === "admin"  && password == "admin") {

                navigate("/admin/dashboard");

            }
        try {

            setLoading(true);


            // Login through backend
            const data = await loginUser({
                username,
                password
            });


            console.log("LOGIN RESPONSE:", data);


            // Store user information
            localStorage.setItem(
                "userId",
                data.id
            );

            localStorage.setItem(
                "userName",
                data.name
            );

            localStorage.setItem(
                "userRole",
                data.role
            );


            if (data.doctor_id) {

                localStorage.setItem(
                    "doctorId",
                    data.doctor_id
                );

            }


            if (data.staff_id) {

                localStorage.setItem(
                    "staffId",
                    data.staff_id
                );

            }


            // Navigate according to role
               
            if (username === "admin"  && password == "admin") {

                navigate("/admin/dashboard");

            }

            else if (data.role === "doctor") {

                navigate("/doctor/dashboard");

            }

            else if (data.role === "reception") {

                navigate("/receptionist/dashboard");

            }

            else if (data.role === "pharmacy") {

                navigate("/pharmacist/dashboard");

            }

            else if (data.role === "lab") {

                navigate("/lab-tech/dashboard");

            }

            else {

                setError(
                    "Invalid user role."
                );

            }


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error.response?.data || error
            );


            // Backend returned an error

            if (error.response?.status === 401) {

                setError(
                    "Invalid username or password."
                );

            }

            else if (error.response?.status === 400) {

                setError(
                    "Invalid username or password."
                );

            }

            else if (error.response?.data?.detail) {

                setError(
                    error.response.data.detail
                );

            }

            else if (error.response?.data?.message) {

                setError(
                    error.response.data.message
                );

            }

            else {

                setError(
                    "Unable to login. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div className="login-card">


                <div className="login-logo">

                    <img
                        src={logo}
                        alt="Hospital"
                    />

                </div>


                <h2>Kims</h2>

                <p>
                    Clinical Management System
                </p>


                <form onSubmit={handleLogin}>


                    <div className="input-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />

                    </div>


                    <div className="input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="login-error">
                            {error}
                        </div>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>


                </form>

            </div>

        </div>

    );
}

export default Login;