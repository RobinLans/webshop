import { render, screen, within } from "@testing-library/react";
import PetsList from "../components/PetsList";
import { PetCard } from "../models/PetsCardInterface";
import ContextProvider from "../context/context";

// USER STORY:
// As a visitor, I want to be able to see all the pets on the frontpage

// Test Cases:
// It renders at least two petCards
// It renders the correct data at the right place

describe("PetsList", () => {
    const petsToRender: PetCard[] = [
        {
            name: "Dog",
            price: 99,
            description: "Dog Desc",
            id: 1,
            quantity: 9,
            image: "exampleURL",
        },
        {
            name: "Cat",
            price: 109,
            description: "This is Cat Description",
            id: 2,
            quantity: 19,
            image: "exampleURL",
        },
    ];

    it("renders without crashing", () => {
        render(
            <ContextProvider>
                <PetsList petsToRender={petsToRender} />
            </ContextProvider>
        );
    });
    it("renders at least two petCards", () => {
        render(
            <ContextProvider>
                <PetsList petsToRender={petsToRender} />
            </ContextProvider>
        );

        const maybePets = screen.getAllByRole("listitem");

        expect(maybePets.length).toBeGreaterThan(1);
    });
    it("renders the right data at the right place", () => {
        render(
            <ContextProvider>
                <PetsList petsToRender={petsToRender} />
            </ContextProvider>
        );
        const testName = "Cat";
        const testPrice = 109;

        const maybePets = screen.getAllByRole("listitem");

        const nameElem = within(maybePets[1]).getByText(testName);
        expect(nameElem).toBeInTheDocument();

        const priceElem = within(maybePets[1]).getByText(`${testPrice}:-`);
        expect(priceElem).toBeInTheDocument();
    });
});
