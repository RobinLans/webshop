import React from "react";
import PetsCard from "./PetsCard";
import { PetCard } from "../models/PetsCardInterface";

interface Props {
    petsToRender: PetCard[] | null;
}

function PetsList({ petsToRender }: Props) {
    return (
        <ul className="grid grid-cols-4 gap-10 mt-6 mb-6">
            {petsToRender &&
                petsToRender.map((pet) => {
                    return <PetsCard pet={pet} key={pet.id} />;
                })}
        </ul>
    );
}

export default PetsList;
