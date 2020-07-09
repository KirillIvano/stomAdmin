import {action} from 'mobx';

import {BaseServiceStore} from '@/helpers/basicStore';
import {getCategories} from '@/services/offers';
import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {clientifyOfferCategory} from '@/entities/offerCategory/transformers';


class CategorySelectStore extends BaseServiceStore {
    @action
    loadCategories = async () => {
        this.loading = true;

        const categoriesRes = await getCategories();

        if (categoriesRes.ok === false) {
            this.error = categoriesRes.error;
        } else {
            const clientifiedCategories =
                categoriesRes.data.categories.map(clientifyOfferCategory);

            offerCategoriesStore.addCategories(clientifiedCategories);
        }

        this.loading = false;
    }
}

export const categorySelectStore = new CategorySelectStore();
