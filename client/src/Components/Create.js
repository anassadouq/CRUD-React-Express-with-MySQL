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
            <table className="mx-3">
                <tbody>
                    <tr>
                        <td>
                            Nom : <input type="text" required onChange={(e) => {setNom(e.target.value)}}/>
                        </td>
                        <td>
                            Prenom : <input type="text" required onChange={(e) => {setPrenom(e.target.value)}}/>
                        </td>
                        <td>
                            Adresse : <input type="text" required onChange={(e) => {setAdresse(e.target.value)}}/>
                        </td>
                        <td>
                            <button type="submit">Create</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}