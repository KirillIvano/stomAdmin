import React from 'react';

import {DeleteIcon, EditIcon} from '@/uikit/Icons';

import styles from './styles.less';

interface OfferCardProps {
    name: string;

    id: number;

    handleDeleteClick: (id: number) => void;
    handleEditClick: (id: number) => void;
    handleBodyClick?: (id: number) => void;
}

const EntityCard = ({
    name,
    id,

    handleDeleteClick,
    handleEditClick,
    handleBodyClick,
}: OfferCardProps) => (
    <div
        className={styles.itemEditCard}
        onClick={handleBodyClick && (() => handleBodyClick(id))}
    >
        <p className={styles.itemName}>{name}</p>
        <div onClick={e => e.stopPropagation()} className={styles.itemControls}>
            <DeleteIcon size={'sm'} handleClick={() => handleDeleteClick(id)} />
            <EditIcon size={'sm'} handleClick={() => handleEditClick(id)} />
        </div>
    </div>
);

export default EntityCard;
