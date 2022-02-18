import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { PetCard } from "../models/PetsCardInterface";
import ProductInCart from "./ProductInCart";
import PlacedOrder from "./PlacedOrder";
import { context } from "../context/context";

function CartModal() {
    const { setShowCartModal, orderPlaced, setOrderPlaced } =
        useContext(context);
    const [productsInCart, setProductsInCart] = useState<PetCard[] | null>([]);
    const [sortedCartByName, setSortedCartByName] = useState<PetCard[] | null>(
        []
    );
    const [totalsSum, setTotalSum] = useState<number | undefined>(0);

    async function fetchPetsInCart(abortCont: any) {
        let { data: cart, error } = await supabase.from("cart").select("*");

        calcSum(cart);
        setProductsInCart(cart);
    }

    useEffect(() => {
        const abortCont = new AbortController();
        fetchPetsInCart(abortCont);
        //Cleanup
        return () => {
            abortCont.abort();
        };
    }, []);

    useEffect(() => {
        const sortedArray: PetCard[] | undefined = productsInCart?.sort(
            (a: PetCard, b: PetCard) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }
        );

        if (!sortedArray) return;
        setSortedCartByName(sortedArray);
        calcSum(sortedArray);
    }, [productsInCart, setProductsInCart]);

    function calcSum(pets: PetCard[] | null) {
        const totalPrice: number | undefined = pets?.reduce((sum, current) => {
            const currentPrice = current.price * current.quantity;
            return sum + currentPrice;
        }, 0);

        setTotalSum(totalPrice);
    }

    function handleOrder() {
        setOrderPlaced(true);
        setTimeout(() => {
            setOrderPlaced(false);
        }, 5000);
    }

    return (
        <div
            className="z-20 w-[905px] h-[600px] flex justify-between absolute h-modal w-modal top-32 bg-[#F3E5DB] rounded-xl border-4 border-[#337B91]"
            id="cart"
        >
            <div className="relative w-nav">
                <h1 className="text-2xl mt-2 ml-4">Your Cart</h1>
                <div className=" h-[33rem] overflow-y-auto">
                    {sortedCartByName?.map((pet, index) => {
                        if (pet.quantity === 0) return;
                        return (
                            <ProductInCart
                                pet={pet}
                                key={index}
                                setProductsInCart={setProductsInCart}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="h-5/6 w-1 ml-10  my-10 bg-primary-green"></div>
            <div className="flex flex-col  w-72 items-center">
                <button
                    className="absolute right-2 top-1 text-3xl font-bold"
                    onClick={() => {
                        setShowCartModal(false);
                    }}
                >
                    X
                </button>
                <h1 className="text-3xl mt-20">€{totalsSum}:-</h1>

                {totalsSum && (orderPlaced && totalsSum) > 0 ? (
                    <PlacedOrder />
                ) : (
                    <button
                        className="myButton mt-36"
                        onClick={() => {
                            handleOrder();
                        }}
                    >
                        Place Order
                    </button>
                )}
            </div>
        </div>
    );
}

export default CartModal;
