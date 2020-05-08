import React from 'react';

import styles from './styles.less';
import {useOffersData} from './hooks/useOffersData';
import {OfferCard} from './../';


interface OffersSectionProps {
    categoryId: number;
}

const OffersSection: React.FC<OffersSectionProps> = ({
    categoryId,
}) => {
    const {data: offers, error, loading} = useOffersData(categoryId);

    if (loading) return <div>loading...</div>;
    if (error) return  <div>error</div>;

    return (
        <div className={styles.offersSection}>
            {offers.map(
                ({name, price, id}) => <OfferCard name={name} price={price} key={id} />,
            )}
        </div>
    );
};

export default OffersSection;
