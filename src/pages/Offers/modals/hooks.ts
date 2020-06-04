import {useReducer, useContext} from 'react';

import {deleteOffer, createOffer} from '@/services/offers';

import {offersModalsReducer, initialState} from './reducer';
import {OffersModalContext} from './context';
import { useRequest } from '@/hooks/useRequest';

export const useOffersModalsReducer = () => {
    const [state, dispatch] = useReducer(offersModalsReducer, initialState);

    return {
        state,
        dispatch,
    };
};

export const useOffersModalsDispatch = () => useContext(OffersModalContext).dispatch;
export const useOffersModalsState = () => useContext(OffersModalContext).state;

export const useOfferDelete = () => useRequest(deleteOffer);
export const useOfferCreate = () => useRequest(createOffer);
