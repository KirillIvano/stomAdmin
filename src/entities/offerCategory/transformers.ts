import {OfferCategory, OfferCategoryDto} from './types';

export const clientifyOfferCategory = (category: OfferCategoryDto): OfferCategory => ({
    ...category,
    id: String(category.id),
});
