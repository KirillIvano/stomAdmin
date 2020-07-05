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
    addOffer = (offer: Offer) => {
        this.offers.set(offer.id, offer);
    }
    @action
    addOffers = (newOffers: Offer[]) => {
        newOffers.map(this.addOffer);
    }
    @action
    removeOffer = (offerId: string) => {
        this.offers.delete(offerId);
    }
}

export const offerStore = new OfferStore();
