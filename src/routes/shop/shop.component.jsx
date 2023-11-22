import ProductCard from '../../components/product-card/product-card.component';
import { ProductsContext } from '../../contexts/product.context';
import { useContext } from 'react';
import './shop.styles.scss';

const Shop = () => {
    const { products } = useContext(ProductsContext)

    return (
        <div className='products-container'>{products.map(el => (
            <ProductCard key={el.id} product={el} />
        ))}</div>
    )
}

export default Shop;