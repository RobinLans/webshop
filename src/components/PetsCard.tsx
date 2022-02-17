import { useContext } from "react";
import { supabase } from "../supabaseClient";
import { context } from "../context/context";
import { PetCard } from "../models/PetsCardInterface";

interface Props {
    pet: PetCard;
}

function PetsCard({ pet }: Props) {
    const { loggedIn, setShowPopUp } = useContext(context);

    async function addToCart(pet: PetCard) {
        const abortCont = new AbortController();
        // Check if pet already exists in Cart
        let { data: cart, error } = await supabase
            .from("cart")
            .select("*")
            .match({ name: pet.name });

        if (!cart) return;

        if (cart?.length > 0) {
            const quantityToAdd = cart[0].quantity + 1;
            const { data, error } = await supabase
                .from("cart")
                .update({ quantity: quantityToAdd })
                .eq("name", pet.name);

            showAndRemoveAlert();
        } else if (cart?.length === 0) {
            const { data, error } = await supabase.from("cart").insert([
                {
                    userId: 1,
                    name: pet.name,
                    price: pet.price,
                    quantity: 1,
                    image: pet.image,
                },
            ]);
            showAndRemoveAlert();
        }
    }

    function showAndRemoveAlert() {
        setShowPopUp(true);
        setTimeout(() => {
            setShowPopUp(false);
        }, 1000);
    }

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
                            loggedIn && pet.quantity !== 0
                                ? "bg-[#337B91]"
                                : "bg-[#7c8d9380] text-sm"
                        }`}
                        disabled={!loggedIn || pet.quantity === 0}
                        onClick={() => addToCart(pet)}
                    >
                        {loggedIn && pet.quantity !== 0
                            ? "Add To Cart"
                            : `${
                                  pet.quantity === 0
                                      ? "Out of stock"
                                      : "Sign in to buy"
                              }`}
                    </button>
                </div>
            </div>
        </li>
    );
}

export default PetsCard;
