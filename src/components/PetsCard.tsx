import { useContext } from "react";
import { context } from "../context/context";
import { PetCard } from "../models/PetsCardInterface";

interface Props {
    pet: PetCard;
}

function PetsCard({ pet }: Props) {
    const { loggedIn } = useContext(context);

    return (
        <li
            className="w-[226px] h-[283px] overflow-hidden border-2 border-[#337B91] rounded relative hover:shadow-md list-none"
            key={pet.id}
            data-testid="pet-card"
        >
            <img src={pet.image} alt="image" className="" />
            <div className="h-[61px] absolute bg-[#F3E5DB] bottom-0 w-full flex flex-col items-center">
                <p className="text-[#337B91] font-bold">{pet.name}</p>
                <div className="w-full flex justify-between">
                    <p className="w-24 ml-2 text-center pt-1 text-[#337B91] font-bold">
                        {pet.price}:-
                    </p>
                    <button
                        className={`w-24  text-[#F3E5DB] p-1 rounded mr-2 pointer-events-auto ${
                            loggedIn ? "bg-[#337B91]" : "bg-[#7c8d9380] text-sm"
                        }`}
                        title="kuk"
                        disabled={!loggedIn}
                    >
                        {loggedIn ? "Add To Cart" : "Sign in to buy"}
                    </button>
                </div>
            </div>
        </li>
    );
}

export default PetsCard;
