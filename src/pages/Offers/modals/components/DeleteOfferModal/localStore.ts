import {action} from 'mobx';

import {offerStore} from '@/entities/offer/store';
import {deleteOffer} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class DeleteOfferState extends ServiceStore {
    @action
    deleteOffer = async (offerId: string) => {
        this.reset();

        const offerDeleteRes = await deleteOffer({id: +offerId});

        if (offerDeleteRes.ok === false) {
            this.error = offerDeleteRes.error;
        } else {
            offerStore.removeOffer(offerId);
            this.success = true;
        }

        this.loading = false;
    }
}

export const deleteOfferState = new DeleteOfferState();
