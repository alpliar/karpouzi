export const getQuantityInCartBySlug = (slug, cart) => {
    const found = cart.find((item) => item.slug === slug);
    return found ? found.quantity : 0;
};
