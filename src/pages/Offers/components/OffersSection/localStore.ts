import {observable, action} from 'mobx';

import {offerStore} from '@/entities/offer/store';
import {getOffers} from '@/services/offers';
import { clientifyOffer } from '@/entities/offer/transformers';

class CreateOfferState {
    @observable
    offerGettingInProgress = false;
    @observable
    offerGettingError: null | string = null;

    @action
    getOffers = async (categoryId: string) => {
        this.offerGettingInProgress = true;
        this.offerGettingError = null;

        const offersGetRes = await getOffers(categoryId);

        if (offersGetRes.ok === false) {
            this.offerGettingError = offersGetRes.error;
        } else {
            offerStore.addOffers(offersGetRes.data.offers.map(clientifyOffer));
        }

        this.offerGettingInProgress = false;
    }
}

export const getOffersState = new CreateOfferState();
