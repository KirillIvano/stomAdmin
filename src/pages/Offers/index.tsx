import React, {useEffect, useContext} from 'react';
import {observer} from 'mobx-react';

import {
    LayoutContainer,
    ErrorView,
    Preloader,
    Button,
} from '@/uikit';
import {PageHeadline} from '@/components';
import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {ModalFacadeContext} from '@/helpers/modals';

import {CategoryCard} from './components';
import {withModalManager} from './modals';
import {offerCategoriesGettingStore} from './store';
import { ModalType } from './modals/types';


const OffersPage = observer(() => {
    const {categoriesArray} = offerCategoriesStore;
    const {
        getCategories,
        loading: categoriesLoading,
        error: categoriesGettingError,
    } = offerCategoriesGettingStore;

    const {openModal} = useContext(ModalFacadeContext) as ({openModal: (modalName: ModalType, id?: string) => void});

    useEffect(() => {getCategories();}, []);

    if (categoriesLoading) return <Preloader />;
    if (categoriesGettingError) return <ErrorView>{categoriesGettingError}</ErrorView>;

    return (
        <LayoutContainer>
            <PageHeadline>Категории услуг</PageHeadline>
            <Button onClick={() => openModal('group_create')}>Добавить категорию</Button>

            {
                categoriesArray.map(
                    ({name, id: categoryId}) => (<CategoryCard
                        openCreateOfferModal={() => openModal('offer_create', categoryId)}
                        openDeleteOfferModal={offerId => openModal('offer_delete', offerId)}
                        openEditOfferModal={offerId => openModal('offer_edit', offerId)}

                        openDeleteCategoryModal={() => openModal('group_delete', categoryId)}
                        openEditCategoryModal={() => openModal('group_edit', categoryId)}

                        name={name}
                        categoryId={categoryId}
                        key={categoryId}
                    />),
                )
            }
        </LayoutContainer>
    );
});

const enchandtedModalManager = withModalManager(OffersPage);

export default enchandtedModalManager;
