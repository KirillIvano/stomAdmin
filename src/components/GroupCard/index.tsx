import React, {useState} from 'react';
import classnames from 'classnames';

import {
    EditIcon,
    CreateIcon,
    DeleteIcon,
} from '@/uikit/Icons';

import styles from './styles.less';

type GroupCardProps = {
    name: string;
    className?: string;
    children: React.ReactNode;

    handleCreate: () => void;
    handleDelete: () => void;
    handleEdit: () => void;
}

const GroupCard = ({
    name,
    className,
    children,

    handleDelete,
    handleEdit,
    handleCreate,
}: GroupCardProps) => {
    const [isContentShown, setContentVisibility] = useState(false);

    return (
        <>
            <div
                className={classnames(styles.categoryCard, className)}
                onClick={() => setContentVisibility(isVisible => !isVisible)}
            >
                <h1 className={styles.categoryName}>{name}</h1>
                <div onClick={e => e.stopPropagation()} className={styles.controls}>
                    <CreateIcon size={'lg'} handleClick={handleCreate} />
                    <DeleteIcon size={'lg'} handleClick={handleDelete} />
                    <EditIcon size={'lg'} handleClick={handleEdit} />
                </div>
            </div>
            {isContentShown && children}
        </>
    );
};

export default GroupCard;

