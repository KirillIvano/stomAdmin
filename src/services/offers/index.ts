import {jsonFetch} from '@/helpers/jsonFetch';

import {OfferCategoryDto, OfferDto} from './dto';

export const getCategories = () =>
    jsonFetch<{categories: OfferCategoryDto[]}>('http://localhost:5000/offer/category/all');

export const deleteOfferCategory = (categoryId: number) =>
    jsonFetch(
        `http://localhost:5000/offer/category/${categoryId}`,
        {method: 'DELETE'},
    );

export const createCategory = (name: string) =>
    jsonFetch<{category: OfferCategoryDto}>(
        'http://localhost:5000/offer/category',
        {
            method: 'POST',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

export const updateCategory = (categoryId: number, name: string) =>
    jsonFetch<{category: OfferCategoryDto}>(
        `http://localhost:5000/offer/category/${categoryId}`,
        {
            method: 'PUT',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );


export const getOffers = (categoryId: string) =>
    jsonFetch<{offers: OfferDto[]}>(`http://localhost:5000/offer/category/${categoryId}/offers`);

export const deleteOffer = ({id}: {id: number}) =>
    jsonFetch<{ok: boolean}>(
        `http://localhost:5000/offer/${id}`,
        {method: 'DELETE'},
    );

export const createOffer = (
    {name, price, categoryId}: {name: string; price: number; categoryId: string},
) =>
    jsonFetch<{offer: OfferDto}>(
        'http://localhost:5000/offer',
        {
            method: 'POST',
            body: JSON.stringify({name, price, categoryId}),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

export const updateOffer = (
    {id, ...body}: {name?: string; price?: number; id: number},
) => jsonFetch<{offer: OfferDto}>(
    `http://localhost:5000/offer/${id}`,
    {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);
