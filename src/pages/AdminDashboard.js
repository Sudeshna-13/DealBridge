import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({});
    const [analytics, setAnalytics] = useState({});

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

    const dashboardResponse =
        await API.get("/admin/dashboard");

    setDashboard(dashboardResponse.data);

    const analyticsResponse =
        await API.get("/admin/analytics");

    setAnalytics(analyticsResponse.data);

};

    return (

    <div>

        <Navbar />

        <div className="container mt-5">

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            {/* Existing Dashboard Cards */}

            <div className="row">

    <div className="col-md-2 mb-3">
        <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
                <h6>Total Users</h6>
                <h3>{dashboard.totalUsers}</h3>
            </div>
        </div>
    </div>

    <div className="col-md-2 mb-3">
        <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
                <h6>Buyers</h6>
                <h3>{dashboard.totalBuyers}</h3>
            </div>
        </div>
    </div>

    <div className="col-md-2 mb-3">
        <div className="card bg-warning text-dark shadow">
            <div className="card-body text-center">
                <h6>Sellers</h6>
                <h3>{dashboard.totalSellers}</h3>
            </div>
        </div>
    </div>

    <div className="col-md-2 mb-3">
        <div className="card bg-info text-white shadow">
            <div className="card-body text-center">
                <h6>Products</h6>
                <h3>{dashboard.totalProducts}</h3>
            </div>
        </div>
    </div>

    <div className="col-md-2 mb-3">
        <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
                <h6>Total Bids</h6>
                <h3>{dashboard.totalBids}</h3>
            </div>
        </div>
    </div>

</div>

            {/* Buttons */}

            <div className="mt-5">

                <Link
                    to="/manage-users"
                    className="btn btn-primary me-3"
                >
                    Manage Users
                </Link>

                <Link
                    to="/manage-products"
                    className="btn btn-success me-3"
                >
                    Manage Products
                </Link>

                <Link
                    to="/manage-buyers"
                    className="btn btn-primary me-3"
                >
                    Manage Buyers
                </Link>

                <Link
                    to="/manage-sellers"
                    className="btn btn-success me-3"
                >
                    Manage Sellers
                </Link>

                <Link
                    to="/bid-monitor"
                    className="btn btn-dark"
                >
                    Bid Monitor
                </Link>
        

                <Link
    to="/bid-history"
    className="btn btn-secondary ms-2"
>
    Bid History
</Link>

            </div>

            {/* Analytics */}

            <div className="row mt-5">

                <div className="col-md-4">

                    <div className="card bg-success text-white">

                        <div className="card-body">

                            <h5>Live Auctions</h5>

                            <h2>{analytics.liveAuctions}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-danger text-white">

                        <div className="card-body">

                            <h5>Completed Auctions</h5>

                            <h2>{analytics.completedAuctions}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-warning">

                        <div className="card-body">

                            <h5>Highest Bid</h5>

                            <h2>₹{analytics.highestBid}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-4">

                    <div className="card bg-info text-white">

                        <div className="card-body">

                            <h5>Total Revenue</h5>

                            <h2>₹{analytics.totalRevenue}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h5>Most Active Buyer</h5>

                            <h2>{analytics.topBuyer}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h5>Most Active Seller</h5>

                            <h2>{analytics.topSeller}</h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);

}

export default AdminDashboard;