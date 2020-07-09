import {jsonFetch} from '@/helpers/jsonFetch';
import {getRequestUrl} from '@/services/helpers';

import {
    OfferCategoryDto,
    OfferDto,
    CategoryPreviewDto,

    CreateCategoryPreviewParams,
    EditCategoryPreviewParams,
} from './dto';

export const getCategories = () =>
    jsonFetch<{categories: OfferCategoryDto[]}>('http://localhost:5000/offer/category/all');

export const deleteOfferCategory = (categoryId: number) =>
    jsonFetch(
        getRequestUrl(`/offer/category/${categoryId}`),
        {method: 'DELETE'},
    );

export const createCategory = (name: string) =>
    jsonFetch<{category: OfferCategoryDto}>(
        getRequestUrl('/offer/category'),
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
        getRequestUrl(`/offer/category/${categoryId}`),
        {
            method: 'PUT',
            body: JSON.stringify({name}),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

export const getOffers = (categoryId: string) =>
    jsonFetch<{offers: OfferDto[]}>(
        getRequestUrl(`/offer/category/${categoryId}/offers`),
    );

export const deleteOffer = ({id}: {id: number}) =>
    jsonFetch<{ok: boolean}>(
        `http://localhost:5000/offer/${id}`,
        {method: 'DELETE'},
    );

export const createOffer = (
    {name, price, categoryId}: {name: string; price: number; categoryId: number},
) =>
    jsonFetch<{offer: OfferDto}>(
        getRequestUrl('/offer'),
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
    getRequestUrl(`/offer/${id}`),
    {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);


export const getCategoryPreviews = () =>
    jsonFetch<{previews: CategoryPreviewDto[]}>(
        getRequestUrl('/offer/preview'),
    );

export const createCategoryPreview = ({
    image,
    name,
    categoryId,
}: CreateCategoryPreviewParams) => {
    const body = new FormData();

    body.append('image', image);
    body.append('name', name);
    body.append('categoryId', categoryId);

    return jsonFetch<{preview: CategoryPreviewDto}>(
        getRequestUrl('/offer/preview'),
        {
            method: 'POST',
            body,
        },
    );
};

export const updateCategoryPreview = (id: number, body: EditCategoryPreviewParams) =>
    jsonFetch<{preview: CategoryPreviewDto}>(
        getRequestUrl(`/offer/preview/${id}`),
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    );

export const updatePreviewImage = (id: number, image: File) => {
    const body = new FormData();

    body.append('image', image);

    return jsonFetch<{preview: CategoryPreviewDto}>(
        getRequestUrl(`/offer/preview/${id}/image`),
        {
            method: 'PUT',
            body,
        },
    );
};

export const deleteCategoryPreview = (id: number) =>
    jsonFetch(
        getRequestUrl(`/offer/preview/${id}`),
        {method: 'DELETE'},
    );
