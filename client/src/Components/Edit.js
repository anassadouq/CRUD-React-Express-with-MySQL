import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${id}`);
            const { nom, prenom, adresse } = response.data;
            setNom(nom);
            setPrenom(prenom);
            setAdresse(adresse);
        } catch (error) {
            console.error("Error fetching user:", error.message);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        const updatedUser = { nom, prenom, adresse };
        try {
            const response = await axios.patch(`http://localhost:3001/users/${id}`, updatedUser);
            console.log(response.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <form onSubmit={updateUser}>
            <table>
                <tr>
                    <td>Nom</td>
                    <td>                
                        <input type="text" value={nom} onChange={(e) => {setNom(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>Prenom</td>
                    <td>                
                        <input type="text" value={prenom} onChange={(e) => {setPrenom(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>Adresse</td>
                    <td>                
                        <input type="text" value={adresse} onChange={(e) => {setAdresse(e.target.value)}}/>
                        <button>Edit</button>
                    </td>
                </tr>
            </table>
        </form>
    );
}