import Navbar from "../components/Navbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/context";

describe("Navbar", () => {
    const loggedIn = true;
    let navbarRender: any;

    beforeEach(() => {
        navbarRender = (
            <ContextProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ContextProvider>
        );
    });

    it("renders without crashing", () => {
        render(navbarRender);
    });

    it("renders 2 links", () => {
        render(navbarRender);
        const productsPage = screen.getByText("Products");
        const aboutPage = screen.getByText("About");

        expect(productsPage).toBeInTheDocument();
        expect(aboutPage).toBeInTheDocument();
    });

    it("shows an login button if I'm not logged in, the cart button should not render", () => {
        render(navbarRender);

        const logInBtn = screen.getByText("Sign In");
        const cartBtn = screen.queryByTestId("cart");

        expect(logInBtn).toBeInTheDocument();
        expect(cartBtn).toBeNull();
    });

    // it("shows a cart if I'm logged in", () => {
    //     window.localStorage.setItem("loggedIn", JSON.stringify(true));
    //     render(
    //         <ContextProvider value={{ loggedIn }}>
    //             <BrowserRouter>
    //                 <Navbar />
    //             </BrowserRouter>
    //         </ContextProvider>
    //     );
    //     const ls = window.localStorage.getItem("loggedIn");

    //     console.log(ls);

    //     const signInBtn = screen.getByText("Sign In");

    //     console.log(signInBtn);

    //     // expect(logInBtn).toBeNull();
    // });
});

//When Sign Out is pressed, the cart and the signup should disappear
