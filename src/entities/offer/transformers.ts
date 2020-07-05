import {OfferDto} from '@/services/offers/dto';

import {Offer} from './types';

export const clientifyOffer = (offer: OfferDto): Offer => ({
    ...offer,
    id: String(offer.id),
    categoryId: String(offer.categoryId),
});
