import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [jmeno, setJmeno] = useState("");
    const [prijmeni, setPrijmeni] = useState("");
    const [email, setEmail] = useState("");
    const [heslo, setHeslo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !jmeno.trim() ||
            !prijmeni.trim() ||
            !email.trim() ||
            !heslo.trim()
        ) {
            alert("Vyplň všechna pole");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jmeno: jmeno.trim(),
                    prijmeni: prijmeni.trim(),
                    email: email.trim().toLowerCase(),
                    heslo: heslo.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Chyba registrace");
                return;
            }

            // uložíme user + token
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <h1>Registrace</h1>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="text"
                        placeholder="Jméno"
                        value={jmeno}
                        onChange={(e) => setJmeno(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Příjmení"
                        value={prijmeni}
                        onChange={(e) => setPrijmeni(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Heslo"
                        value={heslo}
                        onChange={(e) => setHeslo(e.target.value)}
                    />

                    <button type="submit">
                        Vytvořit účet
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Register;