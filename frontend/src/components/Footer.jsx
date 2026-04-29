import "./Footer.css";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* LOGO */}
                <div className="footer-section">
                    <h3 className="footer-logo">BOUJEE</h3>
                    <p>Elegance pro každý den</p>
                </div>

                {/* KONTAKT */}
                <div className="footer-section">
                    <h4>Kontakt</h4>
                    <p>Email: support@boujee.cz</p>
                    <p>Tel: +420 123 456 789</p>
                </div>

                {/* SOCIAL */}
                <div className="footer-section">
                    <h4>Sledujte nás</h4>
                    <div className="socials">
                        <FaInstagram />
                        <FaFacebook />
                        <FaEnvelope />
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Boujee. Všechna práva vyhrazena.
            </div>
        </footer>
    );
}

export default Footer;