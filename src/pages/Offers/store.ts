import {action} from 'mobx';

import {BaseServiceStore} from '@/helpers/basicStore';
import {getCategories} from '@/services/offers';
import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {clientifyOfferCategory} from '@/entities/offerCategory/transformers';

class OfferCategoriesGettingStore extends BaseServiceStore {
    @action
    getCategories = async () => {
        this.loading = true;
        this.error = null;

        const categoriesRes = await getCategories();

        if (categoriesRes.ok === false) {
            this.error = categoriesRes.error;
        } else {
            const clientifiedCategories = categoriesRes.data.categories.map(clientifyOfferCategory);

            offerCategoriesStore.addCategories(clientifiedCategories);
        }

        this.loading = false;
    }
}

export const offerCategoriesGettingStore = new OfferCategoriesGettingStore();
