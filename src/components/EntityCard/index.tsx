import React from 'react';

import {DeleteIcon, EditIcon, PictureIcon} from '@/uikit/Icons';

import styles from './styles.less';

interface EntityCardProps {
    name: string;

    id: string;

    handleDeleteClick?: (id: string) => void;
    handleEditClick?: (id: string) => void;
    handleBodyClick?: (id: string) => void;
    handleImageSelect?: (id: string) => void;
}

// отрисовывает какой-либо предмет, не имеющий дочерних
const EntityCard = ({
    name,
    id,

    handleDeleteClick,
    handleEditClick,
    handleBodyClick,
    handleImageSelect,
}: EntityCardProps) => (
    <div
        className={styles.itemEditCard}
        onClick={handleBodyClick && (() => handleBodyClick(id))}
    >
        <p className={styles.itemName}>{name}</p>
        <div onClick={e => e.stopPropagation()} className={styles.itemControls}>
            <DeleteIcon size={'sm'} handleClick={() => handleDeleteClick(id)} />
            <EditIcon size={'sm'} handleClick={() => handleEditClick(id)} />

            {handleImageSelect && <PictureIcon size={'sm'} handleClick={() => handleImageSelect(id)} />}
        </div>
    </div>
);

export default EntityCard;
