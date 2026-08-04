import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        category: "",
        condition: "",
        startingBid: "",
        expectedPrice: "",
        auctionStart: "",
        auctionEnd: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {

        try {

            const response = await API.get("/products/" + id);

            const data = response.data;

            setProduct({
                productName: data.productName || "",
                description: data.description || "",
                category: data.category || "",
                condition: data.condition || "",
                startingBid: data.startingBid ?? "",
                expectedPrice: data.expectedPrice ?? "",

                auctionStart: data.auctionStart
                    ? data.auctionStart.substring(0, 16)
                    : "",

                auctionEnd: data.auctionEnd
                    ? data.auctionEnd.substring(0, 16)
                    : ""
            });

        } catch (error) {

            console.error("Error loading product:", error);

            alert(
                error.response?.data ||
                "Unable to load product"
            );

            navigate("/my-products");

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!product.productName.trim()) {
            alert("Enter product name");
            return;
        }

        if (!product.description.trim()) {
            alert("Enter product description");
            return;
        }

        if (!product.category.trim()) {
            alert("Enter product category");
            return;
        }

        if (!product.condition) {
            alert("Select product condition");
            return;
        }

        if (Number(product.startingBid) <= 0) {
            alert("Starting bid must be greater than 0");
            return;
        }

        if (Number(product.expectedPrice) <= 0) {
            alert("Expected price must be greater than 0");
            return;
        }

        if (!product.auctionStart) {
            alert("Select auction start time");
            return;
        }

        if (!product.auctionEnd) {
            alert("Select auction end time");
            return;
        }

        if (
            new Date(product.auctionEnd) <=
            new Date(product.auctionStart)
        ) {
            alert("Auction end time must be after start time");
            return;
        }

        try {

            setUpdating(true);

            const updateData = {
                productName: product.productName,
                description: product.description,
                category: product.category,
                condition: product.condition,
                startingBid: Number(product.startingBid),
                expectedPrice: Number(product.expectedPrice),
                auctionStart: product.auctionStart + ":00",
                auctionEnd: product.auctionEnd + ":00"
            };

            console.log("Updating product:", updateData);

            const response = await API.put(
                "/products/update/" + id,
                updateData
            );

            console.log("Update response:", response.data);

            alert("Product Updated Successfully");

            navigate("/my-products");

        } catch (error) {

            console.error("Update error:", error);

            if (error.response) {

                console.error(
                    "Backend response:",
                    error.response.data
                );

                alert(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Failed to update product"
                );

            } else {

                alert("Cannot connect to backend");

            }

        } finally {

            setUpdating(false);

        }
    };

    if (loading) {

        return (
            <div>

                <Navbar />

                <div className="container mt-5">

                    <div className="text-center">

                        <h4>Loading product...</h4>

                    </div>

                </div>

            </div>
        );
    }

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-8">

                        <div className="card shadow">

                            <div className="card-body p-4">

                                <h2 className="mb-4">
                                    Edit Product
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    {/* Product Name */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="productName"
                                            value={product.productName}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Description */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="4"
                                            value={product.description}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Category */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            value={product.category}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Condition */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Condition
                                        </label>

                                        <select
                                            className="form-select"
                                            name="condition"
                                            value={product.condition}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Condition
                                            </option>

                                            <option value="EXCELLENT">
                                                EXCELLENT
                                            </option>

                                            <option value="GOOD">
                                                GOOD
                                            </option>

                                            <option value="FAIR">
                                                FAIR
                                            </option>

                                        </select>

                                    </div>

                                    {/* Starting Bid */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Starting Bid
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="startingBid"
                                            value={product.startingBid}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />

                                    </div>

                                    {/* Expected Price */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Expected Price
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="expectedPrice"
                                            value={product.expectedPrice}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />

                                    </div>

                                    {/* Auction Start */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Auction Start
                                        </label>

                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="auctionStart"
                                            value={product.auctionStart}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Auction End */}

                                    <div className="mb-4">

                                        <label className="form-label">
                                            Auction End
                                        </label>

                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="auctionEnd"
                                            value={product.auctionEnd}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    {/* Buttons */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        disabled={updating}
                                    >

                                        {updating
                                            ? "Updating..."
                                            : "Update Product"}

                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            navigate("/my-products")
                                        }
                                        disabled={updating}
                                    >
                                        Cancel
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default EditProduct;