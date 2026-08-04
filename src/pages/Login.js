import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/Api";

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/users/login", login);

            console.log(response.data);

            // Store complete user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            // Store email separately (used in Buyer/Seller Dashboard)
            localStorage.setItem(
                "email",
                response.data.email
            );

            console.log(localStorage.getItem("user"));
            console.log(localStorage.getItem("email"));

            alert("Login Successful");

            if (response.data.role === "SELLER") {

                navigate("/seller");

            }
            else if (response.data.role === "BUYER") {

                navigate("/buyer");

            }
            else if (response.data.role === "ADMIN") {

                navigate("/admin");

            }

        } catch (error) {

            alert("Invalid Email or Password");

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            DealBridge Login
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={login.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={login.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            New User?{" "}

                            <Link to="/register">
                                Register
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;