import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function ClosedAuctions() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadClosedAuctions();
    }, []);

    const loadClosedAuctions = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/products/closed");

            setProducts(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error("Closed auctions error:", error);

            setError(
                error.response?.data ||
                "Unable to load closed auctions."
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
                        Closed Auctions
                    </h2>

                    <button
                        className="btn btn-warning"
                        onClick={loadClosedAuctions}
                    >
                        Refresh
                    </button>

                </div>

                {loading && (

                    <div className="alert alert-info">
                        Loading closed auctions...
                    </div>

                )}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {!loading && !error && products.length === 0 && (

                    <div className="alert alert-info">
                        No closed auctions found.
                    </div>

                )}

                {!loading && products.length > 0 && (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Starting Bid</th>
                                    <th>Expected Price</th>
                                    <th>Seller</th>
                                    <th>Auction End</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {products.map((product) => (

                                    <tr key={product.productId}>

                                        <td>

                                            {product.imagePath ? (

                                                <img
                                                    src={
                                                        "http://localhost:8082/api/products/image/" +
                                                        product.imagePath
                                                    }
                                                    width="90"
                                                    height="70"
                                                    alt={product.productName}
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            ) : (

                                                "No Image"

                                            )}

                                        </td>

                                        <td>
                                            {product.productName}
                                        </td>

                                        <td>
                                            {product.category}
                                        </td>

                                        <td>
                                            ₹{product.startingBid}
                                        </td>

                                        <td>
                                            ₹{product.expectedPrice}
                                        </td>

                                        <td>
                                            {product.sellerName}
                                        </td>

                                        <td>

                                            {product.auctionEnd
                                                ? new Date(
                                                    product.auctionEnd
                                                ).toLocaleString()
                                                : "N/A"}

                                        </td>

                                        <td>

                                            <span className="badge bg-danger">
                                                CLOSED / SOLD
                                            </span>

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

export default ClosedAuctions;