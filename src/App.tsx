import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "./context/context";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import About from "./components/About";
import LoginModal from "./components/LoginModal";
import CartModal from "./components/CartModal";

function App() {
    const {
        showCartModal,
        showSignInModal,
        setShowSignInModal,
        setShowCartModal,
        showPopUp,
    } = useContext(context);

    return (
        <div className="bg-bg w-screen min-h-screen bg-cover font-body flex flex-col items-center text-[#337B91]">
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/about" element={<About />} />
            </Routes>
            {showSignInModal && <LoginModal />}
            {showCartModal && <CartModal />}
            {(showSignInModal || showCartModal) && (
                <div
                    className="absolute w-full h-full bg-black bg-opacity-40"
                    onClick={() => {
                        setShowSignInModal(false);
                        setShowCartModal(false);
                    }}
                ></div>
            )}
            {showPopUp && (
                <div className="absolute text-3xl font-bold bg-[#337B91] p-2 rounded  text-[#F3E5DB] z-10 bottom-10">
                    <p>Added to cart</p>
                </div>
            )}
        </div>
    );
}

export default App;
