import './notification.styles.scss';
import { useEffect } from 'react';
import { useState } from 'react';

export const Notification = ({ message, onClose }) => {
    let [haveOpacity, setHaveOpacity] = useState(false)
    let [showNotification, setShowNotification] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowNotification(false);
        }, 2500);

        setTimeout(() => {
            setHaveOpacity(true)
        }, 2000);
    }, [onClose]);

    return (
        showNotification && (<div className="notification" style={haveOpacity ? { opacity: '0' } : {}}>
            {message}
        </div>)
    );
};