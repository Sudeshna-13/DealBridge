import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function BidMonitor() {

    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBids();

    }, []);

    const loadBids = async () => {

        try {

            const response = await API.get("/admin/bid-monitor");

            setBids(response.data);

        } catch (error) {

            console.error("Error loading bids:", error);

            alert("Unable to load bid monitor");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        Admin Bid Monitor
                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={loadBids}
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="alert alert-info">
                        Loading bids...
                    </div>

                ) : bids.length === 0 ? (

                    <div className="alert alert-warning">
                        No bids available.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Product ID</th>
                                    <th>Product</th>
                                    <th>Buyer</th>
                                    <th>Seller</th>
                                    <th>Bid Amount</th>
                                    <th>Status</th>
                                    <th>Auction End</th>

                                </tr>

                            </thead>

                            <tbody>

                                {bids.map((bid, index) => (

                                    <tr key={index}>

                                        <td>
                                            {bid.productId}
                                        </td>

                                        <td>
                                            {bid.productName}
                                        </td>

                                        <td>
                                            {bid.buyerName}
                                        </td>

                                        <td>
                                            {bid.sellerName}
                                        </td>

                                        <td>
                                            ₹{bid.highestBid}
                                        </td>

                                        <td>

                                            {bid.status === "AVAILABLE" ? (

                                                <span className="badge bg-success">
                                                    LIVE
                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">
                                                    CLOSED
                                                </span>

                                            )}

                                        </td>

                                        <td>
                                            {bid.auctionEnd
                                                ? new Date(
                                                    bid.auctionEnd
                                                ).toLocaleString()
                                                : "N/A"}
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

export default BidMonitor;