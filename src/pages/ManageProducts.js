import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("/products");

            console.log("Products:", response.data);

            setProducts(response.data);

        } catch (error) {

            console.log("Manage Products Error:", error);

            setError(
                error.response?.data ||
                "Unable to load products."
            );

        } finally {

            setLoading(false);

        }

    };

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response =
                await API.delete("/products/" + id);

            alert(response.data);

            loadProducts();

        } catch (error) {

            console.log("Delete Product Error:", error);

            alert(
                error.response?.data ||
                "Unable to delete product."
            );

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Manage Products</h2>

                    <button
                        className="btn btn-primary"
                        onClick={loadProducts}
                    >
                        Refresh
                    </button>

                </div>

                {loading && (

                    <div className="alert alert-info">
                        Loading products...
                    </div>

                )}

                {!loading && error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {!loading && !error && products.length === 0 && (

                    <div className="alert alert-warning">
                        No products found.
                    </div>

                )}

                {!loading && !error && products.length > 0 && (

                    <div className="card shadow">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Seller</th>
                                            <th>Starting Bid</th>
                                            <th>Expected Price</th>
                                            <th>Status</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {products.map((product, index) => (

                                            <tr key={product.productId || index}>

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>

                                                    {product.imagePath ? (

                                                        <img
                                                            src={
                                                                "http://localhost:8082/api/products/image/" +
                                                                product.imagePath
                                                            }
                                                            alt={product.productName}
                                                            width="70"
                                                            height="70"
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

                                                    <strong>
                                                        {product.productName}
                                                    </strong>

                                                    <br />

                                                    <small>
                                                        {product.description}
                                                    </small>

                                                </td>

                                                <td>
                                                    {product.category}
                                                </td>

                                                <td>
                                                    {product.sellerName || "N/A"}
                                                </td>

                                                <td>
                                                    ₹{product.startingBid}
                                                </td>

                                                <td>
                                                    ₹{product.expectedPrice}
                                                </td>

                                                <td>

                                                    {product.status === "AVAILABLE" ? (

                                                        <span className="badge bg-success">
                                                            LIVE
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-danger">
                                                            SOLD
                                                        </span>

                                                    )}

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                product.productId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ManageProducts;