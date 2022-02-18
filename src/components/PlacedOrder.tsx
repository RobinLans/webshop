function PlacedOrder() {
    return (
        <>
            <p className="mt-36 text-sm opacity-70">Your order number:</p>
            <h1 className="text-3xl">{Math.floor(Math.random() * 1000000)}</h1>
        </>
    );
}

export default PlacedOrder;
