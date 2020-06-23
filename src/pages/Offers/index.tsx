import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    LayoutContainer,
    ErrorView,
    Preloader,
} from '@/uikit';
import {PageHeadline} from '@/components';
import {offerCategoriesStore} from '@/entities/offerCategory/store';

import {CategoryCard} from './components';
import {withModalManager} from './modals';
import {offersModalState} from './modals/localStore';
import {offerCategoriesGettingStore} from './store';


const OffersPage = observer(() => {
    const {categoriesArray} = offerCategoriesStore;
    const {getCategories} = offerCategoriesGettingStore;

    useEffect(() => {getCategories();}, []);

    return (
        <LayoutContainer>
            <PageHeadline>Категории услуг</PageHeadline>
            {
                categoriesArray.map(
                    ({name, id}) => (<CategoryCard
                        openCreateOfferModal={() => {
                            offersModalState.openModal('offer_create', id);
                        }}
                        name={name}
                        categoryId={id}
                        key={id}
                    />),
                )
            }
        </LayoutContainer>
    );
});

const enchandtedModalManager = withModalManager(OffersPage);

export default enchandtedModalManager;
