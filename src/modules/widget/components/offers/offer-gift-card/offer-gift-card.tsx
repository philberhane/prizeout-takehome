import React from 'react';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer } from '../../../../../slices/offers-slice';

import './offer-gift-card.less';
import { useAppSelector } from '../../../../../hooks';
import _ from 'lodash';
import { selectActiveItem, setActiveItem } from '../../../../../slices/activeItem-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({ offer, onClickHandler }): React.ReactElement => {
    let activeOfferId;
    const dispatch = useDispatch<AppDispatch>();
    
    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;

    const isActive:boolean = _.isEqual( useAppSelector(selectActiveItem), offer)
    const activeClass:string = isActive? 'active' : ''

    const classes: string = Classnames('offer-gift-card', activeClass, {
        'selected-offer-gift-card': activeOfferId === firstGiftCard.checkout_value_id,
    });

    const selectOfferOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };

    return (
        <div
            className={classes}
            onClick={() => dispatch(setActiveItem(offer))}
            onKeyDown={(event) => selectOfferOnEnter(event)}
            role="button"
            tabIndex={0}
        >
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
