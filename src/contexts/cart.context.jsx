import { createContext, useEffect, useState } from 'react';

const refreshCartState = (itemsSetterFunction) => {
    const cartItems = JSON.parse(localStorage.getItem('cart'))

    if (cartItems) {
        itemsSetterFunction(cartItems)
    }
}

const addCartItem = (cartItems, productToAdd) => {
    const filteredArray = cartItems.filter(item => item.id === productToAdd.id);

    if (filteredArray.length > 0) {
        filteredArray[0].quantity++;
    }
    else {
        cartItems.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
    return Array.from(cartItems);
}

const removeCartItem = (cartItems, productToRemove) => {
    const indx = cartItems.findIndex(item => item.id === productToRemove.id);

    if (indx === -1) return;
    else {
        const elementToRemove = cartItems[indx];

        if (elementToRemove.quantity === 1) {
            cartItems.splice(indx, 1)
        }
        else {
            elementToRemove.quantity--;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
    return Array.from(cartItems);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    setCartItems: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { }
})

export const CartContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])

    const refreshCart = () => refreshCartState(setCartItems)
    useEffect(refreshCart, [])

    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
    const removeItemFromCart = (productToRemove) => setCartItems(removeCartItem(cartItems, productToRemove));

    const value = { isCartOpen, setIsCartOpen, cartItems, setCartItems, addItemToCart, removeItemFromCart };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}