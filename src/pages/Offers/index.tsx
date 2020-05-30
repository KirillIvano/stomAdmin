import React from 'react';

import {
    LayoutContainer,
    ErrorView,
    Preloader,
} from '@/uikit';
import {PageHeadline} from '@/components';

import {useCategoriesData} from './hooks/useCategoriesData';
import {CategoryCard} from './components';

const OfferPreviewsPage = () => {
    const {data, loading, error} = useCategoriesData();

    if (loading) {
        return <Preloader />;
    }

    if (error) {
        return <ErrorView>{error}</ErrorView>;
    }

    return (
        <LayoutContainer>
            <PageHeadline>Категории услуг</PageHeadline>
            {
                data.map(
                    ({name, id}) => (<CategoryCard
                        name={name}
                        categoryId={id}
                        key={id}
                    />),
                )
            }
        </LayoutContainer>
    );
};
export default OfferPreviewsPage;
