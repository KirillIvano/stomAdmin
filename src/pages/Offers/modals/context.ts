import {createContext} from 'react';
import {ModalActionType} from './actions';
import {OffersModalsStateType} from './types';

type OfferModalContextType = {
    dispatch: React.Dispatch<ModalActionType>;
    state: OffersModalsStateType;
}

export const OffersModalContext = createContext<OfferModalContextType>(null);
