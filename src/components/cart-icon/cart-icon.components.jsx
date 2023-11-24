import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);
    const numberOfCartItems = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)

    return (
        <div className='cart-icon-container' onClick={toggleCartDropdown}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{numberOfCartItems}</span>
        </div>
    )
}

export default CartIcon;
