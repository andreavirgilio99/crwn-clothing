import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCartContainer, Footer, Name, Price } from './product-card.styles';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>
                    {name}
                </Name>
                <Price>
                    {price}
                </Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addItemToCart(product)}>ADD TO CART</Button>
        </ProductCartContainer>
    )
}

export default ProductCard;