import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import AuctionCountdown from "../components/AuctionCountdown";

function BuyerDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [bids, setBids] = useState([]);

    const [stats, setStats] = useState({
        totalAuctions: 0,
        liveAuctions: 0,
        wonAuctions: 0,
        lostAuctions: 0
    });

    const [filter, setFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (user && user.email) {
            loadDashboard();
        }

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const dashboardResponse = await API.get(
                "/buyer/dashboard/" + user.email
            );

            setBids(dashboardResponse.data);

            const statisticsResponse = await API.get(
                "/buyer/statistics/" + user.email
            );

            setStats(statisticsResponse.data);

        } catch (error) {

            console.error(
                "Error loading buyer dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    const getFilteredBids = () => {

        if (filter === "ALL") {
            return bids;
        }

        if (filter === "LIVE") {

            return bids.filter(
                (bid) => bid.status === "AVAILABLE"
            );

        }

        if (filter === "CLOSED") {

            return bids.filter(
                (bid) => bid.status === "SOLD"
            );

        }

        if (filter === "WON") {

            return bids.filter(
                (bid) =>
                    bid.status === "SOLD" &&
                    bid.winner === true
            );

        }

        if (filter === "LOST") {

            return bids.filter(
                (bid) =>
                    bid.status === "SOLD" &&
                    bid.winner === false
            );

        }

        return bids;

    };

    const getStatus = (bid) => {

        if (bid.status === "AVAILABLE") {

            return (
                <span className="badge bg-success">
                    LIVE
                </span>
            );

        }

        if (
            bid.status === "SOLD" &&
            bid.winner === true
        ) {

            return (
                <span className="badge bg-primary">
                    WON
                </span>
            );

        }

        if (
            bid.status === "SOLD" &&
            bid.winner === false
        ) {

            return (
                <span className="badge bg-danger">
                    LOST
                </span>
            );

        }

        if (bid.status === "SOLD") {

            return (
                <span className="badge bg-secondary">
                    CLOSED
                </span>
            );

        }

        return (
            <span className="badge bg-secondary">
                {bid.status}
            </span>
        );

    };

    if (!user) {

        return (

            <div>

                <Navbar />

                <div className="container mt-5">

                    <div className="alert alert-danger">
                        Please login first.
                    </div>

                </div>

            </div>

        );

    }

    const filteredBids = getFilteredBids();

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    Buyer Dashboard
                </h2>

                {/* Buyer Information */}

                <div className="row mb-4">

                    <div className="col-md-4 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Buyer</h6>

                                <h5>
                                    {user.name}
                                </h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Email</h6>

                                <h5>
                                    {user.email}
                                </h5>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-3">

                        <div className="card shadow">

                            <div className="card-body">

                                <h6>Role</h6>

                                <h5>
                                    {user.role}
                                </h5>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Statistics */}

                <h4 className="mb-3">
                    Auction Statistics
                </h4>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body text-center">

                                <h6>Total Auctions</h6>

                                <h2>
                                    {stats.totalAuctions}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body text-center">

                                <h6>Live Auctions</h6>

                                <h2>
                                    {stats.liveAuctions}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-info text-white shadow">

                            <div className="card-body text-center">

                                <h6>Won Auctions</h6>

                                <h2>
                                    {stats.wonAuctions}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-3">

                        <div className="card bg-danger text-white shadow">

                            <div className="card-body text-center">

                                <h6>Lost Auctions</h6>

                                <h2>
                                    {stats.lostAuctions}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <hr className="my-4" />

                {/* Filter Buttons */}

                <div className="d-flex flex-wrap gap-2 mb-4">

                    <button
                        className={
                            filter === "ALL"
                                ? "btn btn-dark"
                                : "btn btn-outline-dark"
                        }
                        onClick={() => setFilter("ALL")}
                    >
                        All Bids
                    </button>

                    <button
                        className={
                            filter === "LIVE"
                                ? "btn btn-success"
                                : "btn btn-outline-success"
                        }
                        onClick={() => setFilter("LIVE")}
                    >
                        Live
                    </button>

                    <button
                        className={
                            filter === "CLOSED"
                                ? "btn btn-secondary"
                                : "btn btn-outline-secondary"
                        }
                        onClick={() => setFilter("CLOSED")}
                    >
                        Closed
                    </button>

                    <button
                        className={
                            filter === "WON"
                                ? "btn btn-primary"
                                : "btn btn-outline-primary"
                        }
                        onClick={() => setFilter("WON")}
                    >
                        Won
                    </button>

                    <button
                        className={
                            filter === "LOST"
                                ? "btn btn-danger"
                                : "btn btn-outline-danger"
                        }
                        onClick={() => setFilter("LOST")}
                    >
                        Lost
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={loadDashboard}
                    >
                        Refresh
                    </button>

                </div>

                {/* Bid List */}

                <h4 className="mb-3">
                    My Bids
                </h4>

                {loading ? (

                    <div className="alert alert-info">
                        Loading bids...
                    </div>

                ) : filteredBids.length === 0 ? (

                    <div className="alert alert-info">
                        No bids found for this filter.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>My Bid</th>
                                    <th>Highest Bid</th>
                                    <th>Auction End</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredBids.map((bid, index) => (

                                    <tr
                                        key={
                                            bid.productId +
                                            "-" +
                                            bid.myBid +
                                            "-" +
                                            index
                                        }
                                    >

                                        <td>

                                            {bid.productImage ? (

                                                <img
                                                    src={
                                                        "http://localhost:8082/api/products/image/" +
                                                        bid.productImage
                                                    }
                                                    width="90"
                                                    height="70"
                                                    alt={bid.productName}
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            ) : (

                                                <span>
                                                    No Image
                                                </span>

                                            )}

                                        </td>

                                        <td>
                                            {bid.productName}
                                        </td>

                                        <td>
                                            ₹{bid.myBid}
                                        </td>

                                        <td>
                                            ₹{bid.highestBid}
                                        </td>

                                        <td>

                                            {bid.status === "AVAILABLE" ? (

                                                <AuctionCountdown
                                                    endTime={bid.auctionEnd}
                                                />

                                            ) : (

                                                bid.auctionEnd
                                                    ? new Date(
                                                        bid.auctionEnd
                                                    ).toLocaleString()
                                                    : "N/A"

                                            )}

                                        </td>

                                        <td>
                                            {getStatus(bid)}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}

export default BuyerDashboard;