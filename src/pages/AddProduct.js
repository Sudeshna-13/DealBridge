import { useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function AddProduct() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        category: "",
        condition: "",
        startingBid: "",
        expectedPrice: "",
        auctionStart: "",
        auctionEnd: "",
        sellerEmail: user.email
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });

    };

    const handleImage = (e) => {

        setImage(e.target.files[0]);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "product",
            new Blob(
                [JSON.stringify(product)],
                { type: "application/json" }
            )
        );

        formData.append("image", image);

        try {

            await API.post(
                "/products/add",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Product Added Successfully");

        }

        catch (err) {

    console.log("Full Error:", err);

    console.log("Response:", err.response);

    console.log("Response Data:", err.response?.data);

    alert("Error Adding Product");

}

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h2 className="mb-4">

                            Add Product

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                className="form-control mb-3"
                                placeholder="Product Name"
                                name="productName"
                                onChange={handleChange}
                            />

                            <textarea
                                className="form-control mb-3"
                                placeholder="Description"
                                name="description"
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Category"
                                name="category"
                                onChange={handleChange}
                            />

                            <select
                                className="form-control mb-3"
                                name="condition"
                                onChange={handleChange}
                            >

                                <option value="">Select Condition</option>
                                <option>EXCELLENT</option>
                                <option>GOOD</option>
                                <option>FAIR</option>

                            </select>

                            <input
                                className="form-control mb-3"
                                placeholder="Starting Bid"
                                name="startingBid"
                                type="number"
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Expected Price"
                                name="expectedPrice"
                                type="number"
                                onChange={handleChange}
                            />

                            <label>

                                Auction Start

                            </label>

                            <input
                                className="form-control mb-3"
                                type="datetime-local"
                                name="auctionStart"
                                onChange={handleChange}
                            />

                            <label>

                                Auction End

                            </label>

                            <input
                                className="form-control mb-3"
                                type="datetime-local"
                                name="auctionEnd"
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-4"
                                type="file"
                                onChange={handleImage}
                            />

                            <button className="btn btn-success">

                                Add Product

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddProduct;