export const SET_PRODUCTS_DATA = 'SET_PRODUCTS_DATA';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY_CART = 'UPDATE_QUANTITY_CART';

export const addToCart = (slug, quantity) => ({
    type: ADD_TO_CART,
    slug: slug,
    quantity: quantity
});

export const updateQuantityCart = (slug, newQuantity) => ({
    type: UPDATE_QUANTITY_CART,
    slug: slug,
    newQuantity: newQuantity
});
