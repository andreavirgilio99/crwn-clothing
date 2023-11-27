import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';
import { useNavigate } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate()
    const handleClick = () => navigate(`${title}`);

    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title' onClick={handleClick}>
                    {title.toUpperCase()}
                </span>
            </h2>
            <div className='preview'>
                {
                    products.slice(0, 4)
                        .map(product => {
                            return (
                                <ProductCard key={product.id} product={product} />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;