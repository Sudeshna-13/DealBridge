import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function AdminBuyers() {

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

                <h2 className="mb-4">
                    All Buyers
                </h2>

                {loading ? (

                    <h5>Loading buyers...</h5>

                ) : buyers.length === 0 ? (

                    <div className="alert alert-info">
                        No buyers registered.
                    </div>

                ) : (

                    <table className="table table-bordered table-striped">

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

                                    <td>{buyer.id}</td>

                                    <td>{buyer.name}</td>

                                    <td>{buyer.email}</td>

                                    <td>{buyer.city}</td>

                                    <td>{buyer.role}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default AdminBuyers;