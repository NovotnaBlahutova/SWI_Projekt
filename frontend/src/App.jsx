import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />   {/* 🔥 FIX */}
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<h1>Košík</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;