import {OfferCategoryDto} from '@/services/offers/dto';

import {OfferCategory} from './types';

export const clientifyOfferCategory = (category: OfferCategoryDto): OfferCategory => ({
    ...category,
    id: String(category.id),
});
