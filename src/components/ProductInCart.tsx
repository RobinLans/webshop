import { useState, useContext, useEffect } from "react";
import { PetCard } from "../models/PetsCardInterface";
import { supabase } from "../supabaseClient";
import { context } from "../context/context";
import { act } from "react-dom/test-utils";

interface Props {
    pet: PetCard;
    setProductsInCart: (pets: PetCard[]) => void;
}

function ProductInCart({ pet, setProductsInCart }: Props) {
    const { orderPlaced, setOrderPlaced } = useContext(context);
    const [inStock, setInStock] = useState(0);

    useEffect(() => {
        checkStock(pet);
    }, []);

    async function checkStock(pet: PetCard) {
        let { data: pets, error } = await supabase
            .from("pets")
            .select("quantity")
            .match({ name: pet.name });

        if (!pets) return;

        setInStock(pets[0].quantity);
    }

    async function incrementCart(name: string) {
        let { data: cart, error } = await supabase
            .from("cart")
            .select("quantity")
            .match({ name: name });

        if (!cart) return;

        if (cart?.length > 0) {
            const quantityToAdd = cart[0].quantity + 1;

            if (quantityToAdd > inStock) return;

            const { data, error } = await supabase
                .from("cart")
                .update({ quantity: quantityToAdd })
                .eq("name", name);

            updateCart();
            // setAmountInCart(quantityToAdd);
        }
    }

    async function decrementCart(name: string) {
        let { data: cart, error } = await supabase
            .from("cart")
            .select("quantity")
            .match({ name: name });

        if (!cart) return;
        // If there only is 1 pet left, remove it from the database and the array
        if (cart[0].quantity === 1) {
            const { data, error } = await supabase
                .from("cart")
                .delete()
                .eq("name", name);
            // setAmountInCart(0);

            if (data && data.length === 1) {
                updateCart();
            }
        }

        if (cart?.length > 0) {
            const quantityToAdd = cart[0].quantity - 1;
            const { data, error } = await supabase
                .from("cart")
                .update({ quantity: quantityToAdd })
                .eq("name", name);

            // setAmountInCart(quantityToAdd);
            updateCart();
        }
    }

    async function removeItemsFromCart(pet: PetCard) {
        // Remove from cart
        const { data, error } = await supabase
            .from("cart")
            .delete()
            .eq("name", pet.name);
        // setAmountInCart(0);

        if (data && data.length === 1) {
            setTimeout(() => {
                updateCart();
                updateTheQuantityInDB(pet);
            }, 5000);
        }
    }

    async function updateTheQuantityInDB(pet: PetCard) {
        let { data: pets, error } = await supabase
            .from("pets")
            .select("quantity")
            .match({ name: pet.name });

        if (pets) {
            const newQuantity = pets[0].quantity - pet.quantity;

            const { data, error } = await supabase
                .from("pets")
                .update({ quantity: newQuantity > 0 ? newQuantity : 0 })
                .eq("name", pet.name);
        }
    }

    async function updateCart() {
        let { data: cart, error } = await supabase.from("cart").select("*");
        if (!cart) return;

        setProductsInCart(cart);
    }

    useEffect(() => {
        if (orderPlaced) {
            removeItemsFromCart(pet);
            setTimeout(() => {
                setOrderPlaced(false);
            }, 5000);
        }
    }, [orderPlaced]);

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
                    <p className="ml-4 mb-1 text-xs text-center opacity-50">
                        {inStock} left in stock
                    </p>
                </div>
                <h4 className="ml-2 text-lg">€{pet.price}:-</h4>
            </div>
            <div className="flex absolute right-0 top-2">
                <button
                    className="text-5xl mt-1 mr-2"
                    onClick={() => {
                        decrementCart(pet.name);
                        // dispatch(decrementCart(pet.id));
                    }}
                >
                    -
                </button>
                <div
                    // type="number"
                    // value={pet.quantity}
                    // disabled={true}
                    className={
                        "mt-4 w-10 h-8 border-2 border-[#337B91] rounded-sm bg-[#EBD5C4] flex justify-center items-center"
                    }
                >
                    <p>{pet.quantity}</p>
                </div>
                <button
                    className="text-4xl mt-2 mx-2"
                    onClick={() => {
                        incrementCart(pet.name);
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
