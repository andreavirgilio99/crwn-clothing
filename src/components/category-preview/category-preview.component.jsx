import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, CategoryTitle, Category } from './category-preview.styles';
import { useNavigate } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate()
    const handleClick = () => navigate(`${title}`);

    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryTitle onClick={handleClick}>
                    {title.toUpperCase()}
                </CategoryTitle>
            </h2>
            <Category>
                {
                    products.slice(0, 4)
                        .map(product => {
                            return (
                                <ProductCard key={product.id} product={product} />
                            )
                        })
                }
            </Category>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;