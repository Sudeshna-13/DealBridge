import { useEffect, useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuctionCountdown from "../components/AuctionCountdown";

function Products() {

    const [products, setProducts] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

    loadProducts();

    const timer = setInterval(() => {

        setProducts(products => [...products]);

    }, 1000);

    return () => clearInterval(timer);

}, []);

    const loadProducts = async () => {

        const response = await API.get("/products");

        setProducts(response.data);

    };

    const searchProducts = async () => {

        if (keyword === "") {

            loadProducts();

            return;

        }

        const response = await API.get(
            "/products/search?keyword=" + keyword
        );

        setProducts(response.data);

    };

    const filterCategory = async () => {

        if (category === "") {

            loadProducts();

            return;

        }

        const response = await API.get(
            "/products/category?category=" + category
        );

        setProducts(response.data);

    };

    const searchFilter = async () => {

        if (keyword === "" && category === "") {

            loadProducts();

            return;

        }

        if (keyword !== "" && category === "") {

            searchProducts();

            return;

        }

        if (keyword === "" && category !== "") {

            filterCategory();

            return;

        }

        const response = await API.get(

            "/products/search-filter?keyword="

            + keyword +

            "&category=" +

            category

        );

        setProducts(response.data);

    };

    const reset = () => {

        setKeyword("");

        setCategory("");

        loadProducts();

    };
    const getRemainingTime = (endTime) => {

    const end = new Date(endTime);

    const now = new Date();

    const difference = end - now;

    if (difference <= 0) {

        return "Auction Ended";

    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(

        (difference % (1000 * 60 * 60 * 24))

        / (1000 * 60 * 60)

    );

    const minutes = Math.floor(

        (difference % (1000 * 60 * 60))

        / (1000 * 60)

    );

    const seconds = Math.floor(

        (difference % (1000 * 60))

        / 1000

    );

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;

};

    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    Antique Products

                </h2>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <input
                            className="form-control"
                            placeholder="Search Product"
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="">
                                All Categories
                            </option>

                            <option>Painting</option>

                            <option>Furniture</option>

                            <option>Sculpture</option>

                            <option>Coins</option>

                            <option>Jewellery</option>

                            <option>Books</option>

                        </select>

                    </div>

                    <div className="col-md-5">

                        <button
                            className="btn btn-primary me-2"
                            onClick={searchProducts}
                        >
                            Search
                        </button>

                        <button
                            className="btn btn-success me-2"
                            onClick={filterCategory}
                        >
                            Filter
                        </button>

                        <button
                            className="btn btn-warning me-2"
                            onClick={searchFilter}
                        >
                            Search + Filter
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={reset}
                        >
                            Reset
                        </button>

                    </div>

                </div>

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

                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}

                                        alt="Product"

                                    />

                                    <div className="card-body">

                                        <h5>

                                            {product.productName}

                                        </h5>

                                        <p>

                                            {product.description}

                                        </p>

                                        <p>

                                            <b>Category :</b>

                                            {" "}

                                            {product.category}

                                        </p>

                                        <p>

                                            <b>Condition :</b>

                                            {" "}

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

                                            {" "}

                                            {product.status}

                                        </p>
                                        <p>

    <b>Auction Ends In :</b>

    <br />

    <AuctionCountdown
        endTime={product.auctionEnd}
    />

</p>
                                        <p>

    <b>Auction Ends In :</b>

</p>

<div className="alert alert-warning text-center">

    {getRemainingTime(product.auctionEnd)}

</div>

                                        <button

                                            className="btn btn-success w-100"

                                            onClick={() =>
                                                navigate(
                                                    "/place-bid",
                                                    {
                                                        state: product
                                                    }
                                                )
                                            }

                                        >

                                            Place Bid

                                        </button>

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

export default Products;