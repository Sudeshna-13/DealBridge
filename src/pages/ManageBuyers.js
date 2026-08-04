import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function ManageBuyers() {

    const [buyers, setBuyers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBuyers();

    }, []);

    const loadBuyers = async () => {

        try {

            const response = await API.get("/admin/buyers");

            setBuyers(response.data);

        } catch (error) {

            console.error("Error loading buyers:", error);

            alert("Unable to load buyers");

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
                        Registered Buyers
                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={loadBuyers}
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="alert alert-info">
                        Loading buyers...
                    </div>

                ) : buyers.length === 0 ? (

                    <div className="alert alert-warning">
                        No buyers found.
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

                                {buyers.map((buyer) => (

                                    <tr key={buyer.id}>

                                        <td>
                                            {buyer.id}
                                        </td>

                                        <td>
                                            {buyer.name}
                                        </td>

                                        <td>
                                            {buyer.email}
                                        </td>

                                        <td>
                                            {buyer.city || "N/A"}
                                        </td>

                                        <td>

                                            <span className="badge bg-primary">
                                                {buyer.role}
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

export default ManageBuyers;