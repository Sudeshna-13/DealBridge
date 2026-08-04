import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import AuctionCountdown from "../components/AuctionCountdown";
import { Link } from "react-router-dom";

function LiveAuctions() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadLiveAuctions();
    }, []);

    const loadLiveAuctions = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/products/live");

            setProducts(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error("Live auctions error:", error);

            setError(
                error.response?.data ||
                "Unable to load live auctions."
            );

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
                        Live Auctions
                    </h2>

                    <button
                        className="btn btn-warning"
                        onClick={loadLiveAuctions}
                    >
                        Refresh
                    </button>

                </div>

                {loading && (

                    <div className="alert alert-info">
                        Loading live auctions...
                    </div>

                )}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {!loading && !error && products.length === 0 && (

                    <div className="alert alert-info">
                        No live auctions available.
                    </div>

                )}

                {!loading && products.length > 0 && (

                    <div className="row">

                        {products.map((product) => (

                            <div
                                className="col-md-4 mb-4"
                                key={product.productId}
                            >

                                <div className="card shadow h-100">

                                    {product.imagePath ? (

                                        <img
                                            src={
                                                "http://localhost:8082/api/products/image/" +
                                                product.imagePath
                                            }
                                            className="card-img-top"
                                            alt={product.productName}
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />

                                    ) : (

                                        <div
                                            className="d-flex align-items-center justify-content-center bg-light"
                                            style={{ height: "220px" }}
                                        >
                                            No Image
                                        </div>

                                    )}

                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {product.productName}
                                        </h5>

                                        <p className="card-text">
                                            {product.description}
                                        </p>

                                        <p>
                                            <strong>
                                                Category:
                                            </strong>{" "}
                                            {product.category}
                                        </p>

                                        <p>
                                            <strong>
                                                Condition:
                                            </strong>{" "}
                                            {product.condition}
                                        </p>

                                        <p>
                                            <strong>
                                                Starting Bid:
                                            </strong>{" "}
                                            ₹{product.startingBid}
                                        </p>

                                        <p>
                                            <strong>
                                                Expected Price:
                                            </strong>{" "}
                                            ₹{product.expectedPrice}
                                        </p>

                                        <p>
                                            <strong>
                                                Seller:
                                            </strong>{" "}
                                            {product.sellerName}
                                        </p>

                                        <p>
                                            <strong>
                                                Location:
                                            </strong>{" "}
                                            {product.sellerCity || "N/A"}
                                        </p>

                                        <div className="mb-3">

                                            <strong>
                                                Auction Ends:
                                            </strong>

                                            <div className="mt-2">

                                                <AuctionCountdown
                                                    endTime={product.auctionEnd}
                                                />

                                            </div>

                                        </div>

                                        <Link
                                            to="/place-bid"
                                            state={{
                                                productId: product.productId
                                            }}
                                            className="btn btn-success w-100"
                                        >
                                            Place Bid
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default LiveAuctions;