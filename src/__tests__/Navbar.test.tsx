import Navbar from "../components/Navbar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/context";

describe("Navbar", () => {
    it("renders without crashing", () => {
        render(
            <ContextProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ContextProvider>
        );
    });

    it("renders 2 links", () => {
        render(
            <ContextProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ContextProvider>
        );
        const productsPage = screen.getByText("Products");
        const aboutPage = screen.getByText("About");

        expect(productsPage).toBeInTheDocument();
        expect(aboutPage).toBeInTheDocument();
    });
});

it("shows an login button if I'm not logged in, the cart button should not render", () => {
    render(
        <ContextProvider>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </ContextProvider>
    );

    const logInBtn = screen.getByText("Sign In");
    const cartBtn = screen.queryByTestId("cart");

    expect(logInBtn).toBeInTheDocument();
    expect(cartBtn).toBeNull();
});

// it("shows a cart if I'm logged in", () => {
//     render(
//         <ContextProvider>
//             <BrowserRouter>
//                 <Navbar />
//             </BrowserRouter>
//         </ContextProvider>
//     );
//     window.localStorage.setItem("loggedIn", JSON.stringify(true));
//     const ls = window.localStorage.getItem("loggedIn");

//     const logInBtn = screen.getByText("Sign In");
//     expect(logInBtn).toBeNull();
// });

//When Sign Out is pressed, the cart and the signup should disappear
