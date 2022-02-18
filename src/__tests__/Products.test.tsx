import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PetsList from "../components/PetsList";
import { PetCard } from "../models/PetsCardInterface";
import Products from "../pages/Products";
import ContextProvider from "../context/context";

// USER STORY:
// As a visitor I want to be able to search for a specific pet

// Test Cases:
// It renders an input field
// it searches for the text that was typed in the input field

describe("Products", () => {
    it("renders without crashing", () => {
        render(<Products />);
    });
    it("renders an input field", () => {
        render(<Products />);

        const maybeInput = screen.getByRole("textbox");

        expect(maybeInput).toBeInTheDocument();
    });
    it("searches for the text that was typed in the input field", () => {
        const testData: PetCard[] = [
            {
                name: "Bird",
                price: 199,
                description: "Bird Desc",
                id: 1,
                quantity: 19,
                image: "exampleURL",
            },
            {
                name: "Panda",
                price: 9,
                description: "This is Bug Description",
                id: 2,
                quantity: 1,
                image: "exampleURL",
            },
        ];
        render(<Products />);
        render(
            <ContextProvider>
                <PetsList petsToRender={testData} />
            </ContextProvider>
        );
        // There should now be 2 pet cards in PetsList
        const maybePetsCards = screen.getAllByRole("listitem");
        expect(maybePetsCards.length).toBe(2);
        const searchInput = screen.getByRole("textbox");
        userEvent.type(searchInput, "Panda");

        const maybePandaCard = screen.queryByText("Panda");
        expect(maybePandaCard).toBeInTheDocument();
    });
});
