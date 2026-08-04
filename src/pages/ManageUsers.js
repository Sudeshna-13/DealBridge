import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await API.get("/admin/users");

            setUsers(response.data);

        } catch (error) {

            console.error("Error loading users:", error);
            alert("Unable to load users");

        }

    };

    const deleteUser = async (id) => {

        const confirmDelete =
            window.confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete("/admin/users/" + id);

            alert("User deleted successfully");

            loadUsers();

        } catch (error) {

            console.error("Delete user error:", error);
            alert("Unable to delete user");

        }

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Manage Users</h2>

                    <Link
                        to="/admin"
                        className="btn btn-secondary"
                    >
                        Back to Dashboard
                    </Link>

                </div>

                <div className="card shadow">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-bordered table-striped">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>City</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >
                                                No users found
                                            </td>

                                        </tr>

                                    ) : (

                                        users.map(user => (

                                            <tr key={user.id}>

                                                <td>
                                                    {user.id}
                                                </td>

                                                <td>
                                                    {user.name}
                                                </td>

                                                <td>
                                                    {user.email}
                                                </td>

                                                <td>
                                                    <span className="badge bg-primary">
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td>
                                                    {user.city || "-"}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ManageUsers;