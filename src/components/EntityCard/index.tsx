import React from 'react';

import {DeleteIcon, EditIcon} from '@/uikit/Icons';

import styles from './styles.less';

interface OfferCardProps {
    name: string;

    id: string;

    handleDeleteClick: (id: string) => void;
    handleEditClick: (id: string) => void;
    handleBodyClick?: (id: string) => void;
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
        onClick={() => handleBodyClick(id)}
    >
        <p className={styles.itemName}>{name}</p>
        <div className={styles.itemControls}>
            <DeleteIcon size={'sm'} handleClick={() => handleDeleteClick(id)} />
            <EditIcon size={'sm'} handleClick={() => handleEditClick(id)} />
        </div>
    </div>
);

export default EntityCard;
