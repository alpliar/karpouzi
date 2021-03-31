interface CartRow {
    slug: string,
    quantity: number
};

export const getQuantityInCartBySlug = (slug: string, cart: CartRow[]) => {
    const found: CartRow = cart.find((item) => item.slug === slug);
    return found ? found.quantity : 0;
};
