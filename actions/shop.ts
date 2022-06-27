export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY_CART = 'UPDATE_QUANTITY_CART';

export const addToCart = (slug: string, quantity: number) => ({
    type: ADD_TO_CART,
    slug,
    quantity: quantity
});

export const updateQuantityCart = (slug: string, newQuantity: number) => ({
    type: UPDATE_QUANTITY_CART,
    slug,
    newQuantity: newQuantity
});

export const removeFromCart = (slug: string) => ({
    type: REMOVE_FROM_CART,
    slug
});
