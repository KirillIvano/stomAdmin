import {action} from 'mobx';

import {offerStore} from '@/entities/offer/store';
import {clientifyOffer} from '@/entities/offer/transformers';
import {createOffer} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class OfferCreateState extends ServiceStore {
    @action
    createOffer = async (
        name: string,
        price: number,
        categoryId: string,
    ) => {
        const offerCreateRes = await createOffer({
            name,
            price,
            categoryId: +categoryId,
        });

        if (offerCreateRes.ok === false) {
            this.error = offerCreateRes.error;
        } else {
            const clientifiedOffer = clientifyOffer(offerCreateRes.data.offer);

            offerStore.addOffer(clientifiedOffer);
            this.success = true;
        }

        this.loading = false;
    }
}

export const offerCreateState = new OfferCreateState();
