import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Link } from 'react-router-dom';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext)

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map(item => <CartItem key={item.id} item={item} />)
                    )
                        : (
                            <EmptyMessage>Your cart is empty.</EmptyMessage>
                        )
                }

            </CartItems>

            <Link to='/checkout' style={{ marginTop: '6px' }}>
                <Button>GO TO CHECKOUT</Button>
            </Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;