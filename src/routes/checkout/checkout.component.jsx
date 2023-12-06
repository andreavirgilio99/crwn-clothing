import { CheckoutContainer, CheckoutHeader, Total, HeaderBlock } from './checkout.styles';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

            {cartItems.map(item => (
                <CheckoutItem key={item.id} cartItem={item} />
            )
            )}
            <Total>Total: ${totalPrice}</Total>
        </CheckoutContainer>
    )
};

export default Checkout;