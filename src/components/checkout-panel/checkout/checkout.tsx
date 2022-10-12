import React, {useEffect, useState} from 'react';
import { useAppSelector } from '../../../hooks';
import { selectActiveItem } from '../../../slices/activeItem-slice';
import { GiftCardImage } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';

import './checkout.less';

export type GiftCardValues = {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
    display_bonus: number;
};

const initializedValues: GiftCardValues = {
    checkout_value_id: '',
    cost_in_cents: 0,
    name: '',
    value_in_cents: 0,
    display_bonus: 0,
}

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const [giftCardValues, setGiftCardValues] = useState<GiftCardValues>(initializedValues)

    const activeItem = useAppSelector(selectActiveItem)

    useEffect(() => {
        setGiftCardValues(initializedValues)
    }, [activeItem])

    const redemptionButtonClick = (currentGiftCard:GiftCardValues) => {
        setGiftCardValues(prevGiftCard => ({
            ...prevGiftCard,
            ...currentGiftCard
        }))
    }

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">
                        {activeItem.name && 
                        <div>
                            <GiftCardImage imgUrl={activeItem.image_url} altText={activeItem.name} />
                            <h3>{activeItem.name}</h3>
                            <p>(Description placeholder) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
                        </div>
                        }
                    </section>
                </div>
                <div className="grid__item">
                    <section className="redemptionValues">
                        <h4>Select Redemption Amount</h4>
                            {activeItem.giftcard_list.map((giftCard, i) => {
                                return <button className={`redemptionButton 
                                        ${giftCard.checkout_value_id == giftCardValues?.checkout_value_id? 
                                        "activeRedemption " : ""} ${i%4 === 0? "":"marginLeft"}`}
                                        key={giftCard.checkout_value_id}
                                        onClick={() => {
                                            redemptionButtonClick({
                                                checkout_value_id: giftCard.checkout_value_id,
                                                cost_in_cents: giftCard.cost_in_cents,
                                                name: activeItem.name,
                                                value_in_cents: giftCard.value_in_cents,
                                                display_bonus: giftCard.display_bonus
                                            })
                                        }}>
                                            ${(giftCard.cost_in_cents/100).toFixed(2)}
                                        </button>
                                })
                            }
                        </section>
                    </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <h4>Redemption Amount <span>${(giftCardValues.cost_in_cents/100).toFixed(2)}</span></h4>
                        <h4 id="bonus">Prizeout Bonus (+{giftCardValues.display_bonus}%)  <span>${((giftCardValues.cost_in_cents/100)*giftCardValues.display_bonus/100).toFixed(2)}</span></h4>
                        <h4>You Get <span>${(giftCardValues.cost_in_cents/100 + ((giftCardValues.cost_in_cents/100)*giftCardValues.display_bonus/100)).toFixed(2)}</span></h4>
                    </section>
                </div>
                <div className="grid__item">
                    <section>
                        <CheckoutButton giftCardValues={giftCardValues} />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
