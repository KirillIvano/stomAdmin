import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import deleteIconSrc from './images/delete.svg';
import addIconSrc from './images/add.svg';
import editIconSrc from './images/edit.svg';

type IconProps =  {
    size: 'sm' | 'lg';
    className?: string;
    handleClick: () => void;
};

const createIcon = (src: string) => ({
    size,
    className,

    handleClick,
}: IconProps) => (
    <button
        onClick={handleClick}
        className={classnames(styles.iconWrapper, className)}
    >
        <img
            src={src}

            className={classnames(
                styles.icon,
                {
                    [styles.small]: size === 'sm',
                    [styles.large]: size === 'lg',
                },
            )}
        />
    </button>
);

export const DeleteIcon = createIcon(deleteIconSrc);
export const CreateIcon = createIcon(addIconSrc);
export const EditIcon = createIcon(editIconSrc);
