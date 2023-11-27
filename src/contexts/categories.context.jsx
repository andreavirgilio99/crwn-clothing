import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.util.js';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesContextProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap, setCategoriesMap }

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
            console.log('setting categories map')
        }

        getCategoriesMap();
    }, [])

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}