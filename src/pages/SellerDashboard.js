import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../services/Api";

function SellerDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [stats, setStats] = useState({
        totalProducts: 0,
        liveAuctions: 0,
        soldProducts: 0
    });

    useEffect(() => {

        loadStatistics();

    }, []);

    const loadStatistics = async () => {

        try {

            const response = await API.get(
                "/products/seller/statistics/" + user.email
            );

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    Seller Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Seller</h6>

                                <h5>{user.name}</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Email</h6>

                                <h5>{user.email}</h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Role</h6>

                                <h5>{user.role}</h5>

                            </div>

                        </div>

                    </div>

                </div>

                <hr />

                <h4 className="mb-3">
                    Auction Statistics
                </h4>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body text-center">

                                <h5>Total Products</h5>

                                <h2>{stats.totalProducts}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body text-center">

                                <h5>Live Auctions</h5>

                                <h2>{stats.liveAuctions}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-danger text-white shadow">

                            <div className="card-body text-center">

                                <h5>Sold Products</h5>

                                <h2>{stats.soldProducts}</h2>

                            </div>

                        </div>

                    </div>
                    <div className="col-md-3 mb-3">

    <div className="card bg-warning text-dark shadow">

        <div className="card-body text-center">

            <h5>Total Earnings</h5>

            <h2>₹{stats.totalEarnings}</h2>

        </div>

    </div>

</div>

                </div>

                <div className="alert alert-success mt-4">

                    Welcome to DealBridge Auction System

                </div>

               <div className="mt-4">

    <Link
        to="/add-product"
        className="btn btn-success me-3"
    >
        Add Product
    </Link>

    <Link
        to="/my-products"
        className="btn btn-primary me-3"
    >
        My Products
    </Link>

    <Link
        to="/seller-sales"
        className="btn btn-dark"
    >
        My Sales
    </Link>

</div>

            </div>

        </div>

    );

}

export default SellerDashboard;