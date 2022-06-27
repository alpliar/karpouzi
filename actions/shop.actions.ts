export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_QUANTITY_CART = 'UPDATE_QUANTITY_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export type ShopAction =
    | { type: 'ADD_TO_CART'; slug: string; quantity: number }
    | { type: 'UPDATE_QUANTITY_CART'; slug: string; newQuantity: number }
    | { type: 'REMOVE_FROM_CART'; slug: string };

export const addToCart = (slug: string, quantity: number): ShopAction => ({
    type: 'ADD_TO_CART',
    slug,
    quantity
});

export const updateQuantityCart = (slug: string, newQuantity: number): ShopAction => ({
    type: 'UPDATE_QUANTITY_CART',
    slug,
    newQuantity
});

export const removeFromCart = (slug: string): ShopAction => ({
    type: 'REMOVE_FROM_CART',
    slug
});
