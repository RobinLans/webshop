import { render } from "@testing-library/react";
import PetsCard from "../components/PetsCard";
import { PetCard } from "../models/PetsCardInterface";

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
        render(<PetsCard pet={pet} />);
    });
});
