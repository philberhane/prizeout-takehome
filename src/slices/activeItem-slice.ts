import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer } from './offers-slice';

export const activeItemInitialState: PrizeoutOffer = {
    checkout_hero_url: '',
    currency_code: '',
    description: '',
    giftcard_list: [],
    image_url: '',
    is_enabled: false,
    logomark_url: '',
    name: '',
    stores: [],
    support_creative_list: [],
    tag: ''
}

export const activeItemSlice = createSlice({
    initialState:  activeItemInitialState,
    name: 'activeItem',
    reducers: {
        setActiveItem(state, action: PayloadAction<PrizeoutOffer>) {
            state.checkout_hero_url = action.payload.checkout_hero_url
            state.currency_code = action.payload.currency_code
            state.description = action.payload.description
            state.giftcard_list = action.payload.giftcard_list
            state.image_url = action.payload.image_url
            state.is_enabled = action.payload.is_enabled
            state.logomark_url = action.payload.logomark_url
            state.name = action.payload.name
            state.stores = action.payload.stores
            state.support_creative_list = action.payload.support_creative_list
            state.tag = action.payload.tag
        }
    },

})

export const {setActiveItem} = activeItemSlice.actions

export const selectActiveItem = ({ activeItem }: RootState): PrizeoutOffer =>
    activeItem;

export default activeItemSlice.reducer;