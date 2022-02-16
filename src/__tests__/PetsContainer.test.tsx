import { render, screen, within } from "@testing-library/react";
import PetsContainer from "../components/PetsContainer";
import PetsCard from "../components/PetsCard";
import { PetCard } from "../models/PetsCardInterface";
import { act } from "react-dom/test-utils";

describe("PetsContainer", () => {
    it("renders without crashing", () => {
        render(<PetsContainer />);
    });
});
// it renders a search field
