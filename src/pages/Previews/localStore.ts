import {action} from 'mobx';

import {BaseServiceStore} from '@/helpers/basicStore';
import {getCategoryPreviews} from '@/services/offers';
import {categoriesPreviewsStore} from '@/entities/categoryPreview/store';
import {clientifyCategoryPreview} from '@/entities/categoryPreview/transformers';

class PreviewsGetStore extends BaseServiceStore {
    @action
    getPreviews = async () => {
        this.loading = true;

        const previewsRes = await getCategoryPreviews();

        if (previewsRes.ok === false) {
            this.error = previewsRes.error;
        } else {
            const clientifiedPreviews = previewsRes.data.previews.map(clientifyCategoryPreview);

            categoriesPreviewsStore.addPreviews(clientifiedPreviews);
        }

        this.loading = false;
    }
}

export const previewsGetStore = new PreviewsGetStore();
