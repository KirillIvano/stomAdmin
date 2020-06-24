import {action} from 'mobx';

import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {deleteOfferCategory} from '@/services/offers';
import {ServiceStore} from '@/helpers/basicStore';

class DeleteOfferState extends ServiceStore {
    @action
    deleteCategory = async (categoryId: string) => {
        this.reset();

        const offerDeleteRes = await deleteOfferCategory(+categoryId);

        if (offerDeleteRes.ok === false) {
            this.error = offerDeleteRes.error;
        } else {
            offerCategoriesStore.removeCategory(categoryId);
            this.success = true;
        }

        this.loading = false;
    }
}

export const deleteOfferState = new DeleteOfferState();

