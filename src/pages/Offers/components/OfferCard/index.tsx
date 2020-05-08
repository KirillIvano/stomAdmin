import React from 'react';

import styles from './styles.less';

interface OfferCardProps {
    name: string;
    price: number;
}

const OfferCard: React.FC<OfferCardProps> = ({
    name,
    price,
}) => (
    <div className={styles.offerCard}>
        <p className={styles.offerName}>{name}</p>
        <p className={styles.offerPrice}>{price}</p>
    </div>
);

export default OfferCard;
