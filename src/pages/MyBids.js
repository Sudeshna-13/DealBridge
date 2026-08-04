import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function MyBids() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [bids, setBids] = useState([]);

    useEffect(() => {

        loadBids();

    }, []);

    const loadBids = async () => {

        try {

            const response = await API.get(
                `/bids/buyer/${user.email}`
            );

            setBids(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">

                    My Bids

                </h2>

                <div className="row">

                    {

                        bids.map(bid => (

                            <div
                                className="col-md-4 mb-4"
                                key={bid.bidId}
                            >

                                <div className="card shadow h-100">

                                    <img

                                        src={`http://localhost:8082/api/products/image/${bid.productImage}`}

                                        className="card-img-top"

                                        style={{
                                            height:"220px",
                                            objectFit:"cover"
                                        }}

                                        alt="Product"

                                    />

                                    <div className="card-body">

                                        <h4>

                                            {bid.productName}

                                        </h4>

                                        <hr/>

                                        <p>

                                            <b>Your Bid</b>

                                        </p>

                                        <h5>

                                            ₹{bid.bidAmount}

                                        </h5>

                                        <p>

                                            <b>Status :</b>

                                            {bid.productStatus}

                                        </p>

                                        <p>

                                            <b>Bid Time</b>

                                        </p>

                                        <small>

                                            {bid.bidTime}

                                        </small>

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

export default MyBids;