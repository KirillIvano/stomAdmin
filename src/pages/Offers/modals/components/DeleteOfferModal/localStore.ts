import {observable, action} from 'mobx';

import {offerStore} from '@/entities/offer/store';
import {createOffer} from '@/services/offers';

class CreateOfferState {
    @observable
    isOfferCreatingInProgress = false;
    @observable
    offerCreatingError: null | string = null;
    @observable
    offerCreatingSuccess: boolean;

    @action
    resetOfferCreating = async () => {
        this.isOfferCreatingInProgress = true;
        this.offerCreatingError = null;
        this.offerCreatingSuccess = false;
    }

    @action
    createOffer = async (
        name: string,
        price: number,
        categoryId: string,
    ) => {
        this.resetOfferCreating();

        const offerCreateRes = await createOffer({
            name,
            price,
            categoryId,
        });

        if (offerCreateRes.ok === false) {
            this.offerCreatingError = offerCreateRes.error;
        } else {
            offerStore.addOffer(offerCreateRes.data.offer);
            this.offerCreatingSuccess = true;
        }

        this.isOfferCreatingInProgress = false;
    }
}

export const createOfferState = new CreateOfferState();
