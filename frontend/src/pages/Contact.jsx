import "./Contact.css";

function Contact() {
    return (
        <div className="contact-page">

            <h1 className="contact-title">Kontakt</h1>

            <div className="contact-container">

                {/* LEFT - INFO */}
                <div className="contact-info">
                    <h3>Boujee Store</h3>

                    <p><strong>Email:</strong> support@boujee.com</p>
                    <p><strong>Telefon:</strong> +420 123 456 789</p>
                    <p><strong>Adresa:</strong> Václavské náměstí 1, Praha</p>

                    <p className="contact-note">
                        Jsme tu pro vás Po–Pá 9:00–18:00
                    </p>
                </div>

                {/* RIGHT - MAP */}
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps?q=Václavské%20náměstí%201%20Praha&output=embed"
                        loading="lazy"
                        title="map"
                    ></iframe>
                </div>

            </div>

        </div>
    );
}

export default Contact;