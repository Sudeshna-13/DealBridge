import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    DealBridge
                </Link>

                <div className="navbar-nav">

                    {

                        user?.role === "SELLER" &&

                        <>

                            <Link
                                className="nav-link"
                                to="/seller"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="nav-link"
                                to="/add-product"
                            >
                                Add Product
                            </Link>
                            <Link
    className="nav-link"
    to="/my-products"
>
    My Products
</Link>

                        </>

                    }

                    {

                        user?.role === "BUYER" &&

                        <>

                            <Link
                                className="nav-link"
                                to="/buyer"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="nav-link"
                                to="/products"
                            >
                                Products
                            </Link>

                            <Link
                                className="nav-link"
                                to="/my-bids"
                            >
                                My Bids
                            </Link>

                            <Link className="nav-link" to="/live-auctions">
    Live Auctions
</Link>

<Link className="nav-link" to="/closed-auctions">
    Closed Auctions
</Link>

                        </>

                    }

                    {

                        user?.role === "ADMIN" &&

                        <>

                            <Link
                                className="nav-link"
                                to="/admin"
                            >
                                Dashboard
                            </Link>

                            <Link
                                className="nav-link"
                                to="/manage-users"
                            >
                                Users
                            </Link>

                            <Link
                                className="nav-link"
                                to="/manage-products"
                            >
                                Products
                            </Link>

                        </>

                    }

                </div>

                <div>

                    <span className="text-white me-3">

                        Welcome, {user?.name}

                    </span>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;