import React from "react";
import { PetCard } from "../models/PetsCardInterface";

interface Props {
    pet: PetCard;
}

function ProductInCart({ pet }: Props) {
    console.log(pet);

    return (
        <div className="flex relative h-20 w-4/3 ml-4 mr-10 my-4 rounded border-2 border-[#337B91] bg-[#E0B9A3] items-center">
            <img
                src={pet.image}
                alt="shoe"
                className="w-16 h-16 ml-2 rounded "
            />
            <div>
                <div className="flex items-end w-96 mr-10">
                    <h4 className="ml-2 text-lg">{pet.name}</h4>
                </div>
                <h4 className="ml-2 text-lg">€{pet.price}:-</h4>
            </div>
            <div className="flex absolute right-0 top-2">
                <button
                    className="text-5xl mt-1 mr-2"
                    onClick={() => {
                        // dispatch(decrementCart(pet.id));
                    }}
                >
                    -
                </button>
                <input
                    type="number"
                    value={pet.quantity}
                    className={
                        "mt-4 w-10 h-8 border-2 border-[#337B91] rounded-sm pl-3 bg-[#EBD5C4]"
                    }
                />
                <button
                    className="text-4xl mt-2 mx-2"
                    onClick={() => {
                        // addToCart(
                        //     pet.title,
                        //     pet.url,
                        //     pet.id,
                        //     pet.price
                        // );
                        // dispatch(incrementCart());
                        // setCurrentQty((prevQty) => prevQty + 1);
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default ProductInCart;
