import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function SellerSales() {

    const email = localStorage.getItem("email");

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadSales();

    }, []);

    const loadSales = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await API.get("/products/seller-sales/" + email);

            console.log("Seller Sales:", response.data);

            setSales(response.data);

        } catch (error) {

            console.log("Seller Sales Error:", error);

            setError(
                error.response?.data ||
                "Unable to load seller sales."
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

                    <h2>My Sales</h2>

                    <button
                        className="btn btn-primary"
                        onClick={loadSales}
                    >
                        Refresh
                    </button>

                </div>

                {loading && (

                    <div className="alert alert-info">
                        Loading sales...
                    </div>

                )}

                {!loading && error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {!loading && !error && sales.length === 0 && (

                    <div className="alert alert-warning">
                        No completed sales found.
                    </div>

                )}

                {!loading && !error && sales.length > 0 && (

                    <div className="card shadow">

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Buyer</th>
                                            <th>Winning Bid</th>
                                            <th>Auction End</th>
                                            <th>Status</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {sales.map((sale, index) => (

                                            <tr key={index}>

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <strong>
                                                        {sale.productName}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {sale.buyerName}
                                                </td>

                                                <td>
                                                    ₹{sale.winningBid}
                                                </td>

                                                <td>
                                                    {sale.auctionEnd
                                                        ? new Date(
                                                            sale.auctionEnd
                                                        ).toLocaleString()
                                                        : "N/A"
                                                    }
                                                </td>

                                                <td>

                                                    <span className="badge bg-success">
                                                        {sale.status}
                                                    </span>

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

export default SellerSales;