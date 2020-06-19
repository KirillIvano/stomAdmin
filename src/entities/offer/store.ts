import {observable} from 'mobx';

import {Offer} from './types';

export class OfferStore {
    @observable offers: Record<string, Offer> = {
        2: {
            id: 2,
            name: 'asfas',
            price: 2000,
        },
    };

    @observable offersGettingLoading = false;
    @observable offersGettingError: string | null = null;
    @observable offersLoading = false;
}

export const offerStore = new OfferStore();
