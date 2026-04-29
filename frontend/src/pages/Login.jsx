import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Vyplň všechna pole");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    heslo: password.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Chyba přihlášení");
                setLoading(false);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <h1>Přihlášení</h1>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Přihlašuji..." : "Přihlásit se"}
                    </button>

                </form>

                <p style={{ marginTop: "10px" }}>
                    Nemáš účet? <Link to="/register">Registruj se</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;