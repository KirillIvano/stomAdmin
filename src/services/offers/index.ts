import {jsonFetch} from '@/helpers/jsonFetch';
import {OfferCategory} from '@/entities/offerCategory/types';
import {Offer} from '@/entities/offer/types';

export const getCategories = async () =>
    jsonFetch<OfferCategory[]>('http://localhost:5000/offer/category/all');

export const getOffers = async (categoryId: number) =>
    jsonFetch<Offer[]>(`http://localhost:5000/offer/category/${categoryId}/offers`);
