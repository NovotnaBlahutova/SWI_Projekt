import "./Home.css";

import jewelry from "../assets/images/jewelry.jpg";
import bag from "../assets/images/bag.jpg";
import shoes from "../assets/images/shoes.jpg";
import watches from "../assets/images/watches.jpg";
import scarf from "../assets/images/scarf.jpg";
import perfume from "../assets/images/perfume.jpg";
import clothes from "../assets/images/clothes.jpg";
import wallet from "../assets/images/wallet.jpg";
import video from "../assets/images/video.mp4";
import perfume_presale from "../assets/images/perfume_presale.jpg";
import shoes_presale from "../assets/images/shoes_presale.jpg";
import bag_presale from "../assets/images/bag_presale.jpg";
import watches_best from "../assets/images/watches_best.jpg";
import bowtie_best from "../assets/images/bowtie_best.jpg";
import overal_best from "../assets/images/overal_best.jpg";
import summer from "../assets/images/summer_collection.jpg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Den Matek</h1>
                    <p>Pro ženu, která si zaslouží to nejlepší</p>
                    <button>Nakupujte nyní</button>
                </div>
            </section>

            {/* KATEGORIE */}
            {/* KATEGORIE */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Dárky pro ni</h2>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-5">

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={bag} alt="Kabelky" />
                            <div className="card-body text-center">
                                <h5>Kabelky</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={shoes} alt="Boty" />
                            <div className="card-body text-center">
                                <h5>Boty</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={watches} alt="Hodinky" />
                            <div className="card-body text-center">
                                <h5>Hodinky</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={scarf} alt="Šály" />
                            <div className="card-body text-center">
                                <h5>Šály</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={perfume} alt="Parfémy" />
                            <div className="card-body text-center">
                                <h5>Parfémy</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={jewelry} alt="Šperky" />
                            <div className="card-body text-center">
                                <h5>Šperky</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={clothes} alt="Oblečení" />
                            <div className="card-body text-center">
                                <h5>Oblečení</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card category-card-clean">
                            <img src={wallet} alt="Peněženky" />
                            <div className="card-body text-center">
                                <h5>Peněženky</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="video-section">

                <video autoPlay muted loop className="video-bg">
                    <source src={video} type="video/mp4" />
                </video>

                <div className="video-overlay">
                    <h2>Styl, který mluví za vás</h2>
                    <p>Elegance v každém detailu</p>
                    <button>Prohlédnout</button>
                </div>

            </section>

            {/* PRE-SALE PRODUKTY */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Pre-sale produkty</h2>

                <div className="row row-cols-1 row-cols-md-3 g-5">

                    <div className="col">
                        <div className="card product-card">
                            <img src={perfume_presale} className="card-img-top" alt="Parfém" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Parfém</h5>
                                <p className="price">3 290 Kč</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card product-card">
                            <img src={bag_presale} className="card-img-top" alt="Kožená kabelka" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Kožená kabelka</h5>
                                <p className="price">6 490 Kč</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card product-card">
                            <img src={shoes_presale} className="card-img-top" alt="Luxusní boty" />
                            <div className="card-body text-center">
                                <h5 className="card-title">Luxusní boty</h5>
                                <p className="price">8 990 Kč</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* BANNER */}
            <section className="quote-banner">
                <p>Elegance je jediná krása, která nikdy nevyjde z módy.</p>
            </section>

            {/* BESTSELLERS */}
            <section className="container mt-5">
                <h2 className="mb-4 text-center">Nejprodávanější</h2>

                <div className="row row-cols-1 row-cols-md-3 g-4">

                    <div className="col">
                        <div className="card product-card">
                            <div className="badge">Bestseller</div>
                            <img src={watches_best} alt="Luxusní hodinky" />
                            <div className="card-body text-center">
                                <h5>Hodinky</h5>
                                <p className="price">4 290 Kč</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card product-card">
                            <div className="badge">Bestseller</div>
                            <img src={overal_best} alt="Khaki overal" />
                            <div className="card-body text-center">
                                <h5>Khaki overal</h5>
                                <p className="price">2 490 Kč</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card product-card">
                            <div className="badge">Bestseller</div>
                            <img src={bowtie_best} alt="Navi motýlek" />
                            <div className="card-body text-center">
                                <h5>Navi motýlek</h5>
                                <p className="price">890 Kč</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* SPRING HERO */}
            {/* SUMMER COLLECTION HERO */}
            <section
                className="summer-hero"
                style={{ backgroundImage: `url(${summer})` }}
            >
                <div className="summer-overlay">
                    <h2>Objevte naši letní kolekci</h2>
                    <p>Lehkost, barvy a letní elegance</p>
                    <button>Prohlédnout kolekci</button>
                </div>
            </section>


        </div>
    );
}

export default Home;