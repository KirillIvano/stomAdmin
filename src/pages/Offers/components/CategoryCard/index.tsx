import React from 'react';

import {GroupCard} from '@/components';

import {OffersSection} from '..';

interface CategoryCardProps {
    categoryId: string;
    name: string;

    openEditCategoryModal: () => void;
    openDeleteCategoryModal: () => void;

    openDeleteOfferModal: (id: string) => void;
    openEditOfferModal: (id: string) => void;
    openCreateOfferModal: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    categoryId,
    name,

    openEditCategoryModal,
    openDeleteCategoryModal,

    openCreateOfferModal,
    openDeleteOfferModal,
    openEditOfferModal,
}) => (
    <GroupCard
        name={name}

        handleEdit={() => openEditCategoryModal()}
        handleDelete={() => openDeleteCategoryModal()}
        handleCreate={() => openCreateOfferModal()}
    >
        <OffersSection
            categoryId={categoryId}
            openDeleteModal={openDeleteOfferModal}
            openEditModal={openEditOfferModal}
        />
    </GroupCard>
);

export default CategoryCard;
