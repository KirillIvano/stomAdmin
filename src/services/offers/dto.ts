export type OfferDto = {
    id: number;
    categoryId: number;
    name: string;
    price: number;
}

export type UpdateOfferDto = {
    name?: string;
    price?: string;
}

export type OfferCategoryDto = {
    id: number;
    name: string;
}

export type CategoryPreviewDto = {
    id: number;
    categoryId: number;
    name: string;
    image: string;
}

export type UpdateCategoryPreview = {
    name?: string;
    categoryId?: number;
}
