import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function SellerBids() {

    const { id } = useParams();

    const [bids, setBids] = useState([]);

    const [winner, setWinner] = useState(null);

    useEffect(() => {

        loadBids();

    }, []);

    const loadBids = async () => {

        const response = await API.get("/bids/product/" + id);

        setBids(response.data);

    };

    const declareWinner = async () => {

        const response = await API.get("/bids/winner/" + id);

        setWinner(response.data);

        alert("Winner Declared Successfully");

        loadBids();

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <h2>Product Bids</h2>

                <table className="table table-bordered mt-4">

                    <thead>

                        <tr>

                            <th>Buyer</th>

                            <th>Email</th>

                            <th>Bid Amount</th>

                            <th>Bid Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            bids.map(bid => (

                                <tr key={bid.bidId}>

                                    <td>{bid.buyerName}</td>

                                    <td>{bid.buyerEmail}</td>

                                    <td>₹{bid.bidAmount}</td>

                                    <td>{bid.bidTime}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

                {

                    bids.length > 0 && winner == null && (

                        <button

                            className="btn btn-success"

                            onClick={declareWinner}

                        >

                            Declare Winner

                        </button>

                    )

                }

                {

                    winner && (

                        <div className="alert alert-success mt-4">

                            <h4>Winner Declared</h4>

                            <hr/>

                            <p>

                                <b>Winner :</b> {winner.winnerName}

                            </p>

                            <p>

                                <b>Email :</b> {winner.winnerEmail}

                            </p>

                            <p>

                                <b>Winning Bid :</b> ₹{winner.winningBid}

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default SellerBids;