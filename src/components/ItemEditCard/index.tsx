import React from 'react';

import {Button} from '@/components';

import styles from './styles.less';
import icons from './images';

interface CardControlsButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
}

const CardControlsButton: React.FC<CardControlsButtonType> = ({
    icon,
    ...props
}) => (
    <Button {...props} className={styles.itemButton}>
        <img className={styles.itemIcon} src={icon} />
    </Button>
);


interface OfferCardProps {
    name: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
    name,
}) => (
    <div className={styles.itemEditCard}>
        <p className={styles.itemName}>{name}</p>
        <div className={styles.itemControls}>
            <CardControlsButton icon={icons.delete} />
            <CardControlsButton icon={icons.edit} />
            <CardControlsButton icon={icons.add} />
        </div>
    </div>
);

export default OfferCard;
