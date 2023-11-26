import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");

    const createUser = async (e) => {
        e.preventDefault();

        const newUser = {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
        };

        try {
            const response = await axios.post("http://localhost:3001/users", newUser);
            console.log(response.data);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else {
                console.log("Error creating user:", error.message);
            }
        }
    };

    return (
        <form onSubmit={createUser}>
            <table>
                <tr>
                    <td>Nom</td>
                    <td>                
                        <input type="text" onChange={(e) => {setNom(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>Prenom</td>
                    <td>                
                        <input type="text" onChange={(e) => {setPrenom(e.target.value)}}/>
                    </td>
                </tr>
                <tr>
                    <td>Adresse</td>
                    <td>                
                        <input type="text" onChange={(e) => {setAdresse(e.target.value)}}/>
                        <button>Create</button>
                    </td>
                </tr>
            </table>
        </form>
    );
}