import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/Api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "BUYER",
        city: "",
        state: "",
        country: "India"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await API.post(
                "/users/register",
                form
            );

            console.log("Registration response:", response.data);

            /*
             * Do NOT show:
             * "Successfully Registered"
             *
             * Just redirect to login.
             */

            navigate("/");

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                error.response?.data ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Create DealBridge Account
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            minLength="4"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Register As
                                    </label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="BUYER">
                                            Buyer
                                        </option>

                                        <option value="SELLER">
                                            Seller
                                        </option>

                                    </select>

                                </div>

                                <div className="row">

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Country
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Creating Account..."
                                        : "Register"}

                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?{" "}

                                <Link to="/">
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;