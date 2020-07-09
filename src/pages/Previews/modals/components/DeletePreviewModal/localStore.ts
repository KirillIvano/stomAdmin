import {action} from 'mobx';

import {ServiceStore} from '@/helpers/basicStore';
import {deleteCategoryPreview} from '@/services/offers';
import {categoriesPreviewsStore} from '@/entities/categoryPreview/store';

class PreviewDeleteStore extends ServiceStore {
    @action
    async deletePreview(categoryId: string) {
        this.loading = true;

        const previewDeleteRes = await deleteCategoryPreview(+categoryId);

        if (previewDeleteRes.ok === false) {
            this.error = previewDeleteRes.error;
        } else {
            categoriesPreviewsStore.removePreview(categoryId);

            this.success = true;
        }

        this.loading = false;
    }
}

export const previewDeleteStore = new PreviewDeleteStore();
