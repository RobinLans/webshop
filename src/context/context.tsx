import { createContext, useState } from "react";

// MISSION CONTROL CENTRE

export const context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(
        JSON.parse(localStorage.getItem("loggedIn") as string) || false
    );
    const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
    const [showCartModal, setShowCartModal] = useState<boolean>(false);
    return (
        <context.Provider
            value={{
                loggedIn,
                setLoggedIn,
                showSignInModal,
                setShowSignInModal,
                showCartModal,
                setShowCartModal,
            }}
        >
            {children}
        </context.Provider>
    );
};

export default ContextProvider;
