import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { PetCard } from "../models/PetsCardInterface";
import ProductInCart from "./ProductInCart";
import { context } from "../context/context";

function CartModal() {
    const { setShowCartModal } = useContext(context);
    const [productsInCart, setProductsInCart] = useState<PetCard[] | null>([]);

    async function fetchPetsInCart(abortCont: any) {
        let { data: cart, error } = await supabase.from("cart").select("*");

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

    return (
        <div
            className="z-20 w-[905px] h-[600px] flex justify-between absolute h-modal w-modal top-32 bg-[#F3E5DB] rounded-xl border-4 border-[#337B91]"
            id="cart"
        >
            <div className="relative w-nav">
                <h1 className="text-2xl mt-2 ml-4">Your Cart</h1>
                <div className=" h-4/5 overflow-y-auto">
                    {productsInCart?.map((pet, index) => {
                        return <ProductInCart pet={pet} key={index} />;
                    })}
                </div>
                {/* <button
                    className="myButton absolute bottom-4 left-72
      "
                    onClick={() => {
                        // closeCart(false);
                        // history.push("/");
                    }}
                >
                    More Products
                </button> */}
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
                {/* <h1 className="text-3xl mt-20">€{sum}:-</h1> */}

                {/* {orderPlaced && sum > 0 ? (
                    <PlacedOrder cancelOrder={cancelOrder} />
                ) : (
                    <button
                        className="myButton mt-36"
                        onClick={() => {
                            setOrderPlaced(true);
                        }}
                    >
                        Place Order
                    </button>
                )} */}
            </div>
        </div>
    );
}

export default CartModal;
