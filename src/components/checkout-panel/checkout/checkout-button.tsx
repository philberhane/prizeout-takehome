import React, { useState } from 'react';
import { Button } from '../../common';
import { GiftCardValues } from './checkout';

interface GiftCardPropType {
    giftCardValues: GiftCardValues
}

const CheckoutButton: React.FC<GiftCardPropType> = ({giftCardValues}): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const [isRun, setIsRun] = useState(false);
    const [serverMessage, setServerMessage] = useState('')
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(giftCardValues)
    };

    const clickHandler = () => {
        // Checkout logic here
        if (giftCardValues.checkout_value_id.length !== 0) {
            if (isRun) { return; }
            setIsRun(true);
            fetch('', requestOptions)
            .then(response => {
                setIsRun(false);
                setServerMessage('Your purchase has been completed!')
             });
        } else {
            setServerMessage('Please choose a redemption amount.')
        }
    };

    return (
        <div>
            <p>{serverMessage}</p>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={clickHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </div>
    );
};

export default CheckoutButton;
