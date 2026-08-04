import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AuctionCountdown from "../components/AuctionCountdown";

function MyProducts() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        const response = await API.get(
            "/products/seller/" + user.email
        );

        setProducts(response.data);

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete Product?"))
            return;

        await API.delete("/products/" + id);

        loadProducts();

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <h2>My Products</h2>

                <table className="table table-bordered table-striped mt-4">

                    <thead>

                        <tr>

                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Starting Bid</th>
                            <th>Status</th>
                            <th>Countdown</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map(product => (

                                <tr key={product.productId}>

                                    <td>

                                        <img
                                            src={`http://localhost:8082/api/products/image/${product.imagePath}`}
                                            width="100"
                                            alt=""
                                        />

                                    </td>

                                    <td>{product.productName}</td>

                                    <td>{product.category}</td>

                                    <td>

                                        ₹{product.startingBid}

                                    </td>

                                    <td>{product.status}</td>
<td>

    <AuctionCountdown
        endTime={product.auctionEnd}
    />

</td>
                                    <td>

    <Link
        to={"/edit-product/" + product.productId}
        className="btn btn-primary btn-sm me-2"
    >
        Edit
    </Link>

    <Link
        to={"/seller-bids/" + product.productId}
        className="btn btn-success btn-sm me-2"
    >
        View Bids
    </Link>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteProduct(product.productId)}
    >
        Delete
    </button>

</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MyProducts;