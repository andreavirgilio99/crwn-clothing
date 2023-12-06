import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { CartContext } from '../../contexts/cart.context';
import { useContext, useRef, useEffect } from 'react';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen)
    const iconId = 'CrwnClothing_Logo';

    useEffect(() => {
        const handleClickOutside = ({ target }) => {
            try {
                if (target.id !== iconId && target.parentElement.id !== iconId) {
                    setIsCartOpen(false);
                }
            } catch (err) { }
        };

        // Aggiungi l'event listener solo al montaggio del componente
        document.addEventListener('click', handleClickOutside);

        // Rimuovi l'event listener quando il componente viene smontato
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const numberOfCartItems = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)

    return (
        <CartIconContainer id={iconId} onClick={toggleCartDropdown}>
            <ShoppingIcon />
            <ItemCount>{numberOfCartItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
