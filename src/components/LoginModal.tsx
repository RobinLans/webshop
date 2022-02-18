import React, {
    useContext,
    useState,
    ChangeEvent,
    SyntheticEvent,
} from "react";
import { context } from "../context/context";
import { supabase } from "../supabaseClient";

function LoginModal() {
    const { setShowSignInModal, setLoggedIn } = useContext(context);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }
    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: SyntheticEvent, un: string, pw: string) {
        e.preventDefault();
        setUsername("");
        setPassword("");
        if (un === "" && pw === "") {
            alert("You need to provide login info");
            return;
        }
        if (un === "") {
            alert("You need to provide a username");
            return;
        }
        if (pw === "") {
            alert("You need to provide a password");
            return;
        }

        let { data: users, error } = await supabase
            .from("users")
            .select("name, role")
            .match({ name: un, password: pw });

        if (users?.length === 0) {
            alert("There is no user matching those credentials, try again");
            return;
        }
        if (error) {
            throw new Error(error.message);
        }
        if (users?.length === 1) {
            localStorage.setItem("loggedIn", JSON.stringify(true));
            setLoggedIn(true);
            setShowSignInModal(false);
        }
    }

    return (
        <div className="h-52 w-72 absolute top-44 bg-[#F3E5DB] rounded border-4 border-[#337B91] z-10">
            <button
                className="text-2xl font-semibold absolute left-1"
                onClick={() => {
                    setShowSignInModal(false);
                }}
            >
                X
            </button>
            <form
                onSubmit={(e) => handleSubmit(e, username, password)}
                className="flex flex-col items-center"
            >
                <h1 className="text-xl font-bold my-2">Sign in</h1>
                <input
                    type="text"
                    value={username}
                    className="inputs mb-4"
                    placeholder="Username"
                    onChange={handleUsername}
                />
                <input
                    type="password"
                    value={password}
                    className="inputs mb-4"
                    placeholder="Password"
                    onChange={handlePassword}
                />
                <button
                    type="submit"
                    // onClick={() => handleLogin(username, password)}
                    className="text-[#F3E5DB] p-1 rounded mr-2 bg-[#337B91]"
                    data-testid="modal-sign-in"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default LoginModal;
