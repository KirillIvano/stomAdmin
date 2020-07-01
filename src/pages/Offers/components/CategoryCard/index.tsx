import React, {useCallback, useContext} from 'react';

import {GroupCard} from '@/components';
import {ModalType} from '@/pages/Offers/modals/types';
import {ModalFacadeContext} from '@/helpers/modals';

import {OffersSection} from '..';

interface CategoryCardProps {
    categoryId: string;
    name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    categoryId,
    name,
}) => {
    const {openModal} = useContext(ModalFacadeContext) as ({openModal: (modalName: ModalType, id?: string) => void});

    const openCreateOfferModal = useCallback(() => openModal('offer_create', categoryId), []);
    const openDeleteOfferModal = useCallback((offerId: string) => openModal('offer_delete', offerId), []);
    const openEditOfferModal = useCallback((offerId: string) => openModal('offer_edit', offerId), []);
    const openDeleteCategoryModal = useCallback(() => openModal('group_delete', categoryId), []);
    const openEditCategoryModal = useCallback(() => openModal('group_edit', categoryId), []);

    return (
        <GroupCard
            id={categoryId}
            name={name}

            handleEdit={openEditCategoryModal}
            handleDelete={openDeleteCategoryModal}
            handleCreate={openCreateOfferModal}
        >
            <OffersSection
                categoryId={categoryId}
                openDeleteModal={openDeleteOfferModal}
                openEditModal={openEditOfferModal}
            />
        </GroupCard>
    );
};

export default CategoryCard;
