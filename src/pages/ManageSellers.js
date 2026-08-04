import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function ManageSellers() {

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSellers();

    }, []);

    const loadSellers = async () => {

        try {

            const response = await API.get("/admin/sellers");

            setSellers(response.data);

        } catch (error) {

            console.error("Error loading sellers:", error);

            alert("Unable to load sellers");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        Registered Sellers
                    </h2>

                    <button
                        className="btn btn-success"
                        onClick={loadSellers}
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="alert alert-info">
                        Loading sellers...
                    </div>

                ) : sellers.length === 0 ? (

                    <div className="alert alert-warning">
                        No sellers found.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Role</th>

                                </tr>

                            </thead>

                            <tbody>

                                {sellers.map((seller) => (

                                    <tr key={seller.id}>

                                        <td>
                                            {seller.id}
                                        </td>

                                        <td>
                                            {seller.name}
                                        </td>

                                        <td>
                                            {seller.email}
                                        </td>

                                        <td>
                                            {seller.city || "N/A"}
                                        </td>

                                        <td>

                                            <span className="badge bg-success">
                                                {seller.role}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}

export default ManageSellers;