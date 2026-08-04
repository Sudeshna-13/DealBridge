import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function SellerProducts() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [products, setProducts] = useState([]);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response = await API.get(
                `/products/seller/${user.email}`
            );

            setProducts(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Products");

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

            const response = await API.delete(
                `/products/${id}`
            );

            alert(response.data);

            loadProducts();

        }

        catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    My Products

                </h2>

                <div className="row">

                    {

                        products.map(product => (

                            <div
                                className="col-md-4 mb-4"
                                key={product.productId}
                            >

                                <div className="card shadow h-100">

                                    <img

                                        src={`http://localhost:8082/api/products/image/${product.imagePath}`}

                                        className="card-img-top"

                                        alt="Product"

                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}

                                    />

                                    <div className="card-body">

                                        <h4>

                                            {product.productName}

                                        </h4>

                                        <p>

                                            {product.description}

                                        </p>

                                        <hr />

                                        <p>

                                            <b>Category :</b>

                                            {product.category}

                                        </p>

                                        <p>

                                            <b>Condition :</b>

                                            {product.condition}

                                        </p>

                                        <p>

                                            <b>Starting Bid :</b>

                                            ₹{product.startingBid}

                                        </p>

                                        <p>

                                            <b>Expected Price :</b>

                                            ₹{product.expectedPrice}

                                        </p>

                                        <p>

                                            <b>Status :</b>

                                            {product.status}

                                        </p>

                                        <p>

                                            <b>Auction Start :</b>

                                            <br />

                                            {product.auctionStart}

                                        </p>

                                        <p>

                                            <b>Auction End :</b>

                                            <br />

                                            {product.auctionEnd}

                                        </p>

                                        <div className="d-grid gap-2">

                                            <button
                                                className="btn btn-warning"
                                            >
                                                Edit Product
                                            </button>

                                            <button
                                                className="btn btn-info"
                                            >
                                                View Winner
                                            </button>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    deleteProduct(product.productId)
                                                }
                                            >
                                                Delete Product
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default SellerProducts;