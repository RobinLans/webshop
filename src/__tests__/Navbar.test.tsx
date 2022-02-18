import Navbar from "../components/Navbar";
import App from "../App";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/context";

// USER STORY:
// As a visitor, I want to be able to navigate between the products page
// and the about page

// Test Cases:
// It renders a navbar with links
// It shows an login button if I'm not logged in, the cart button should not render
// It shows a cart if I'm logged in

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

    it("renders a navbar with links", () => {
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

    it("shows a cart if I'm logged in", () => {
        // Check to see if the cart renders before we log in, it shouldn't
        render(
            <ContextProvider value={{ loggedIn }}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ContextProvider>
        );
        const maybeCartBtnBeforeLogIn = screen.queryByTestId("cart");

        expect(maybeCartBtnBeforeLogIn).toBeNull();

        // Log in by adding a token in LS
        window.localStorage.setItem("loggedIn", JSON.stringify(true));
        // re-render the whole app
        render(
            <ContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ContextProvider>
        );

        render(
            <ContextProvider value={{ loggedIn }}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ContextProvider>
        );

        const maybeCartBtnAfterLogIn = screen.getAllByTestId("cart");

        expect(maybeCartBtnAfterLogIn[0]).toBeInTheDocument();
    });
});
