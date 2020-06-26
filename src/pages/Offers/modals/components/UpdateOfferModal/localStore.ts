import {action} from 'mobx';

import {offerStore} from '@/entities/offer/store';
import {clientifyOffer} from '@/entities/offer/transformers';
import {updateOffer} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class OfferUpdateState extends ServiceStore {
    @action
    updateOffer = async (
        offerId: string,
        name: string,
        price: number,
    ) => {
        this.reset();

        const offerUpdateRes = await updateOffer({id: +offerId, name, price});

        if (offerUpdateRes.ok === false) {
            this.error = offerUpdateRes.error;
        } else {
            const clientifiedOffer =  clientifyOffer(offerUpdateRes.data.offer);

            offerStore.addOffer(clientifiedOffer);
            this.success = true;
        }

        this.loading = false;
    }
}

export const offerUpdateState = new OfferUpdateState();
