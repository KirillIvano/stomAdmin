import {observable, action, computed} from 'mobx';

import {Offer} from './types';

export class OfferStore {
    @observable
    offers = new Map<string, Offer>();

    @computed
    get offersArray() {
        this.offers;
        return [...this.offers.values()];
    }

    @action
    addOffer = async (offer: Offer) => {
        this.offers.set(offer.id, offer);
    }
    @action
    addOffers = async (offers: Offer[]) => {
        offers.map(this.addOffer);
    }
}

export const offerStore = new OfferStore();
