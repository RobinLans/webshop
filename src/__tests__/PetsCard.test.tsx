import { render, screen } from "@testing-library/react";
import PetsCard from "../components/PetsCard";
import { PetCard } from "../models/PetsCardInterface";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "../context/context";
import App from "../App";

describe("PetsCard", () => {
    it("renders without crashing", () => {
        const pet: PetCard = {
            name: "Dog",
            price: 99,
            quantity: 10,
            description: "test description",
            image: "imageUrl",
            id: 1,
        };
        render(
            <ContextProvider>
                <PetsCard pet={pet} />
            </ContextProvider>
        );
    });
    // test("addToCart function runs once when add to cart button is clicked", () => {
    //     const pet: PetCard = {
    //         name: "Dog",
    //         price: 99,
    //         quantity: 10,
    //         description: "test description",
    //         image: "imageUrl",
    //         id: 1,
    //     };
    //     // Add the logged in local storage item
    //     window.localStorage.setItem("loggedIn", JSON.stringify(true));
    //     // render the whole app
    //     render(
    //         <ContextProvider>
    //             <Router>
    //                 <App />
    //             </Router>
    //         </ContextProvider>
    //     );
    //     render(
    //         <ContextProvider>
    //             <PetsCard pet={pet} />
    //         </ContextProvider>
    //     );
    //     const addToCart = jest.fn();
    //     const addToCartBtn = screen.getByText("Add To Cart");

    //     //Click on button
    //     userEvent.click(addToCartBtn);

    //     //
    //     const maybeAddedToCartBtn = screen.getByText("Added to cart");

    //     // expect(addToCartFunction.mock.calls.length).toBe(1);

    //     console.log(maybeAddedToCartBtn);
    // });
});
