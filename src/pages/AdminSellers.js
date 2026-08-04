import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function AdminSellers() {

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

                <h2 className="mb-4">
                    All Sellers
                </h2>

                {loading ? (

                    <h5>Loading sellers...</h5>

                ) : sellers.length === 0 ? (

                    <div className="alert alert-info">
                        No sellers registered.
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

                            {sellers.map((seller) => (

                                <tr key={seller.id}>

                                    <td>{seller.id}</td>

                                    <td>{seller.name}</td>

                                    <td>{seller.email}</td>

                                    <td>{seller.city}</td>

                                    <td>{seller.role}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}

export default AdminSellers;