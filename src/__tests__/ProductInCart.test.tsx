import { render, screen } from "@testing-library/react";
import ProductInCart from "../components/ProductInCart";
import { PetCard } from "../models/PetsCardInterface";
import ContextProvider from "../context/context";

// USER STORY:
// As a user I want to be able to add and remove one or more pets to the cart

// Test Cases:
// It displays the value 1 in the amount in cart box initially

describe("ProductInCart", () => {
    let mockSetProducts: jest.Mock;
    let productInCartJSX: any;

    beforeEach(() => {
        const pet: PetCard = {
            name: "Dog",
            price: 99,
            quantity: 1,
            description: "test description",
            image: "imageUrl",
            id: 1,
        };
        mockSetProducts = jest.fn();
        productInCartJSX = (
            <ContextProvider>
                <ProductInCart pet={pet} setProductsInCart={mockSetProducts} />
            </ContextProvider>
        );
    });

    it("renders without crashing", () => {
        render(productInCartJSX);
    });

    it("displays the value 1 in the amount in cart box initially", () => {
        render(productInCartJSX);
        const element = screen.getByText("1");
        expect(element).toBeInTheDocument();
    });
});
