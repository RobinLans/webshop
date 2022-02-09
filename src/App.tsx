import React, { useContext, useEffect } from "react";
import { context } from "./context/context";
import { supabase } from "./supabaseClient";

function App() {
    const { test } = useContext(context);

    async function fetchTest() {
        let { data } = await supabase.from("users").select("*");

        console.log(data);
    }

    console.log(test);

    useEffect(() => {
        fetchTest();
    }, []);

    return (
        <div className="bg-bg w-screen h-screen bg-cover font-body">
            <h1>hej</h1>
        </div>
    );
}

export default App;
