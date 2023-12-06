import { CheckoutItemContainer, Arrow, BaseSpan, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles'
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart } = useContext(CartContext);

    const removeAllFromCart = (item) => {
        const quantity = item.quantity
        for (let i = 0; i < quantity; i++) {
            removeItemFromCart(item);
        }
    }
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan> {name} </BaseSpan>
            <Quantity>
                <Arrow onClick={() => removeItemFromCart(cartItem)}>
                    &#10094;
                </Arrow>
                <Value> {quantity} </Value>
                <Arrow onClick={() => addItemToCart(cartItem)}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan> {price} </BaseSpan>
            <RemoveButton onClick={() => removeAllFromCart(cartItem)}> &#10005; </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;