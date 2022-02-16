import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { context } from "./context/context";
import Navbar from "./components/Navbar";
import PetsContainer from "./components/PetsContainer";
import About from "./components/About";
import LoginModal from "./components/LoginModal";

function App() {
    const {
        showCartModal,
        showSignInModal,
        setShowSignInModal,
        setShowCartModal,
    } = useContext(context);

    return (
        <div className="bg-bg w-screen h-screen bg-cover font-body flex flex-col items-center text-[#337B91]">
            <Navbar />
            <Routes>
                <Route path="/" element={<PetsContainer />} />
                <Route path="/about" element={<About />} />
            </Routes>
            {showSignInModal && <LoginModal />}
            {(showSignInModal || showCartModal) && (
                <div
                    className="absolute w-full h-full bg-black bg-opacity-40"
                    onClick={() => {
                        setShowSignInModal(false);
                        setShowCartModal(false);
                    }}
                ></div>
            )}
        </div>
    );
}

export default App;
