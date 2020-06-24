import {Offer, OfferDto} from './types';

export const clientifyOffer = (offer: OfferDto): Offer => ({
    ...offer,
    id: String(offer.id),
    categoryId: String(offer.categoryId),
});
