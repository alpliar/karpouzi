interface CartRow {
    slug: string;
    quantity: number;
}

export const getQuantityInCartBySlug = (slug: string, cart: CartRow[]): number => {
    const found: CartRow | undefined = cart.find((item) => item.slug === slug);
    return found ? found.quantity : 0;
};
