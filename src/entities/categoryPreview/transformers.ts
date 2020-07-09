import {CategoryPreviewDto} from '@/services/offers/dto';

import {CategoryPreview} from './types';

export const clientifyCategoryPreview = (preview: CategoryPreviewDto): CategoryPreview => ({
    ...preview,
    id: String(preview.id),
    categoryId: String(preview.categoryId),
});
