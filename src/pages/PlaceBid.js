import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function PlaceBid() {

    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state;

    const user = JSON.parse(localStorage.getItem("user"));

    const [bidAmount, setBidAmount] = useState("");

    const placeBid = async (e) => {

        e.preventDefault();

        try {

            const bid = {

                productId: product.productId,
                buyerEmail: user.email,
                bidAmount: Number(bidAmount)

            };

            const response = await API.post(
                "/bids/place",
                bid
            );

            alert(response.data);

            navigate("/products");

        }

        catch (error) {

            console.log(error);

            alert("Unable to Place Bid");

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card shadow">

                            <div className="card-body">

                                <h2 className="mb-4">

                                    Place Bid

                                </h2>

                                <hr/>

                                <h4>

                                    {product.productName}

                                </h4>

                                <p>

                                    {product.description}

                                </p>

                                <p>

                                    <b>Current Starting Bid :</b>

                                    ₹{product.startingBid}

                                </p>

                                <form onSubmit={placeBid}>

                                    <input

                                        type="number"

                                        className="form-control mb-3"

                                        placeholder="Enter Bid Amount"

                                        value={bidAmount}

                                        onChange={(e)=>setBidAmount(e.target.value)}

                                        required

                                    />

                                    <button

                                        className="btn btn-success w-100"

                                    >

                                        Place Bid

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

export default PlaceBid;