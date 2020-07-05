import {action} from 'mobx';

import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {clientifyOfferCategory} from '@/entities/offerCategory/transformers';
import {createCategory} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class OfferCategoryCreateState extends ServiceStore {
    @action
    createOfferCategory = async (name: string) => {
        const offerCreateRes = await createCategory(name);

        if (offerCreateRes.ok === false) {
            this.error = offerCreateRes.error;
        } else {
            const clientifiedCategory = clientifyOfferCategory(offerCreateRes.data.category);

            offerCategoriesStore.addCategory(clientifiedCategory);
            this.success = true;
        }

        this.loading = false;
    }
}

export const offerCategoryCreateState = new OfferCategoryCreateState();
