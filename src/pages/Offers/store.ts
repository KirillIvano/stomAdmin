import {observable, action} from 'mobx';

import {getCategories} from '@/services/offers';
import {offerCategoriesStore} from '@/entities/offerCategory/store';

class OfferCategoriesGettingStore {
    @observable
    isCategoriesGettingInProgress = false;
    @observable
    categoriesGettingError: null | string = null;

    @action
    getCategories = async () => {
        this.isCategoriesGettingInProgress = true;
        this.categoriesGettingError = null;

        const categoriesRes = await getCategories();

        if (categoriesRes.ok === false) {
            this.categoriesGettingError = categoriesRes.error;
        } else {
            offerCategoriesStore.addCategories(categoriesRes.data.categories);
        }

        this.isCategoriesGettingInProgress = false;
    }
}

export const offerCategoriesGettingStore = new OfferCategoriesGettingStore();
