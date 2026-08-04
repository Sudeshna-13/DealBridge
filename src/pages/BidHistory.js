import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function BidHistory() {

    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBidHistory();

    }, []);

    const loadBidHistory = async () => {

        try {

            const response = await API.get("/bids/history");

            setBids(response.data);

        } catch (error) {

            console.error("Error loading bid history:", error);

            alert("Unable to load bid history");

        } finally {

            setLoading(false);

        }

    };

    const getStatusBadge = (status) => {

        if (status === "AVAILABLE") {

            return (
                <span className="badge bg-success">
                    LIVE
                </span>
            );

        }

        if (status === "SOLD") {

            return (
                <span className="badge bg-danger">
                    CLOSED
                </span>
            );

        }

        return (
            <span className="badge bg-secondary">
                {status}
            </span>
        );

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        Bid History
                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={loadBidHistory}
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="alert alert-info">
                        Loading bid history...
                    </div>

                ) : bids.length === 0 ? (

                    <div className="alert alert-warning">
                        No bids found.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Bid ID</th>

                                    <th>Buyer</th>

                                    <th>Buyer Email</th>

                                    <th>Seller</th>

                                    <th>Seller Email</th>

                                    <th>Product</th>

                                    <th>Bid Amount</th>

                                    <th>Bid Time</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {bids.map((bid) => (

                                    <tr key={bid.bidId}>

                                        <td>
                                            {bid.bidId}
                                        </td>

                                        <td>
                                            {bid.buyerName}
                                        </td>

                                        <td>
                                            {bid.buyerEmail}
                                        </td>

                                        <td>
                                            {bid.sellerName}
                                        </td>

                                        <td>
                                            {bid.sellerEmail}
                                        </td>

                                        <td>
                                            {bid.productName}
                                        </td>

                                        <td>
                                            ₹{bid.bidAmount}
                                        </td>

                                        <td>
                                            {bid.bidTime
                                                ? new Date(
                                                    bid.bidTime
                                                ).toLocaleString()
                                                : "N/A"}
                                        </td>

                                        <td>
                                            {getStatusBadge(bid.status)}
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

export default BidHistory;