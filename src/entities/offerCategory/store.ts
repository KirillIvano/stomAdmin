import {observable, action, computed} from 'mobx';
import { categoriesPreviewsStore } from '../categoryPreview/store';

import {OfferCategory} from './types';

export class OfferCategoriesStore {
    @observable
    offerCategories = new Map<string, OfferCategory>();

    @computed
    get categoriesArray() {
        return [...this.offerCategories.values()];
    }

    @action
    addCategory(category: OfferCategory) {
        this.offerCategories.set(category.id, category);
    }

    @action
    addCategories(categories: OfferCategory[]) {
        categories.forEach(
            category => this.offerCategories.set(`${category.id}`, category),
        );
    }

    @action
    removeCategory(categoryId: string) {
        categoriesPreviewsStore.removePreviewsByCategoryId(categoryId);
        this.offerCategories.delete(categoryId);
    }
}

export const offerCategoriesStore = new OfferCategoriesStore();
