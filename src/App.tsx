import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductContainer from "./components/ProductContainer";
import About from "./components/About";

function App() {
    return (
        <div className="bg-bg w-screen h-screen bg-cover font-body flex flex-col items-center">
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductContainer />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

export default App;
