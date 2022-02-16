import { Link } from "react-router-dom";
import { FaFish, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { context } from "../context/context";

function Navbar() {
    const { loggedIn, setShowSignInModal, setLoggedIn } = useContext(context);

    function handleSignOut() {
        if (window.confirm("Do you wanna sign out?")) {
            setLoggedIn(false);
            localStorage.removeItem("loggedIn");
        }
    }

    return (
        <div className="bg-[#F3E5DB] border-4 border-[#337B91] w-[60rem] min-h-[6rem] rounded-lg mt-2 shadow-md flex justify-between items-center">
            <div className="flex ml-4 items-center">
                <h1 className="text-[#337B91] text-2xl font-bold">
                    The Pet Store
                </h1>
                <FaFish className="text-[#337B91] text-4xl ml-2" />
            </div>
            <div className="mr-4 flex items-center">
                <Link to="/" className="text-[#337B91] text-lg font-bold mr-4">
                    Products
                </Link>
                <Link
                    to="/about"
                    className="text-[#337B91] text-lg font-bold mr-4"
                >
                    About
                </Link>
                {!loggedIn ? (
                    <button
                        className="text-[#337B91] text-lg font-bold mr-4"
                        onClick={() => {
                            setShowSignInModal(true);
                        }}
                    >
                        Sign In
                    </button>
                ) : (
                    <>
                        <button
                            className="text-[#337B91] text-lg font-bold mr-4"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                        <button data-testid="cart">
                            <FaShoppingCart className="text-[#337B91] text-4xl" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
