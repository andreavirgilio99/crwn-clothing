import { useParams } from 'react-router-dom';
import './category.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams()
    const { categoriesMap } = useContext(CategoriesContext);
    let [products, setProducts] = useState([]);
    console.log('after initializing: ', products)

    useEffect(() => {
        if (categoriesMap && categoriesMap[category]) {
            setProducts(categoriesMap[category])
            console.log('setting products in effect')
        }
    },
        [category, categoriesMap]
    )

    return (
        <div className='category-container'>
            {
                categoriesMap[category] && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}

export default Category;