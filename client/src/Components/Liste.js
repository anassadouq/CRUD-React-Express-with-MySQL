import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Liste() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/users")
        .then(response => {
            setUsers(response.data);
        })
    }, []);

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
        .then(response => {
            console.log(response.data.message);
            // If deletion is successful, update the state to reflect the changes
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        })
    };

    return (
        <div>
            <Link to="/create">
                <button>Create User</button>
            </Link>
            <table width="100%" style={{"textAlign":"center"}}>
                <thead>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </thead>
                {users.map((user,key) => (
                    <tbody key={key}>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.adresse}</td>
                        <td>
                            <Link to={`/edit/${user.id}`}>Edit</Link>&nbsp;
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </td>
                    </tbody>
                ))}
            </table>
        </div>
    );
}