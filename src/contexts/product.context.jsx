import SHOP_DATA from '../shop-data.json';
import { createContext, useState } from 'react';

export const ProductsContext = createContext({
    products: []
});

export const ProductsContextProvider = ({ children }) => {
    const [products, setProduct] = useState(SHOP_DATA);

    const value = { products, setProduct }

    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
}