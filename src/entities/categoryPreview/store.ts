import {observable, action, computed} from 'mobx';

import {CategoryPreview} from './types';

export class CategoriesPreviewsStore {
    @observable
    categoriesPreviews = new Map<string, CategoryPreview>();

    @computed
    get previewsArray() {
        return [...this.categoriesPreviews.values()];
    }

    @action
    addPreview(preview: CategoryPreview) {
        this.categoriesPreviews.set(preview.id, preview);
    }

    @action
    addPreviews(previews: CategoryPreview[]) {
        previews.forEach(
            preview => this.categoriesPreviews.set(`${preview.id}`, preview),
        );
    }

    @action
    removePreview(previewId: string) {
        this.categoriesPreviews.delete(previewId);
    }

    @action
    removePreviewsByCategoryId(categoryId: string) {
        for (const [previewId, preview] of this.categoriesPreviews.entries()) {
            if (preview.categoryId === categoryId) {
                this.categoriesPreviews.delete(previewId);
            }
        }
    }
}

export const categoriesPreviewsStore = new CategoriesPreviewsStore();
