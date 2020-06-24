import {action} from 'mobx';

import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {clientifyOfferCategory} from '@/entities/offerCategory/transformers';
import {updateCategory} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class UpdateOfferCategoryState extends ServiceStore {
    @action
    updateOfferCategory = async (categoryId: string, name: string) => {
        this.reset();

        const offerCategoryEditRes = await updateCategory(+categoryId, name);

        if (offerCategoryEditRes.ok === false) {
            this.error = offerCategoryEditRes.error;
        } else {
            const clientifiedCategory = clientifyOfferCategory(offerCategoryEditRes.data.category);

            offerCategoriesStore.addCategory(clientifiedCategory);
            this.success = true;
        }

        this.loading = false;
    }
}

export const updateOfferCategoryState = new UpdateOfferCategoryState();
