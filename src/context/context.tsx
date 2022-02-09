import { createContext, useState } from "react";

// MISSION CONTROL CENTRE

export const context = createContext<any>(null);

const ContextProvider = ({ children }: any) => {
    const [test, setTest] = useState<boolean>(false);
    return (
        <context.Provider value={{ test, setTest }}>
            {children}
        </context.Provider>
    );
};

export default ContextProvider;
