import {action} from 'mobx';

import {ServiceStore} from '@/helpers/basicStore';
import {createCategoryPreview} from '@/services/offers';
import {clientifyCategoryPreview} from '@/entities/categoryPreview/transformers';
import {categoriesPreviewsStore} from '@/entities/categoryPreview/store';

class PreviewCreateStore extends ServiceStore {
    @action
    async createPreview(
        name: string,
        categoryId: string,
        image: File,
    ) {
        this.loading = true;

        const previewCreateRes = await createCategoryPreview({
            name,
            categoryId,
            image,
        });

        if (previewCreateRes.ok === false) {
            this.error = previewCreateRes.error;
        } else {
            const clientifiedPreview = clientifyCategoryPreview(
                previewCreateRes.data.preview,
            );

            categoriesPreviewsStore.addPreview(clientifiedPreview);

            this.success = true;
        }

        this.loading = false;
    }
}

export const previewCreateStore = new PreviewCreateStore();
