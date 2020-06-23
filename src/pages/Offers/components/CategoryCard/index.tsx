import React from 'react';

import {GroupCard} from '@/components';

import {OffersSection} from '..';

interface CategoryCardProps {
    categoryId: string;
    name: string;

    // openEditModal: (id: number) => void;
    // openDeleteModal: (id: number) => void;
    openCreateOfferModal: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    categoryId,
    name,

    // openEditModal,
    // openDeleteModal,
    openCreateOfferModal,
}) => (
    <GroupCard
        name={name}
        handleCreate={() => openCreateOfferModal()}
        // handleDelete={() => openDeleteModal(categoryId)}
        // handleEdit={() => openEditModal(categoryId)}
    >
        <OffersSection
            categoryId={categoryId}
        />
    </GroupCard>
);

export default CategoryCard;
