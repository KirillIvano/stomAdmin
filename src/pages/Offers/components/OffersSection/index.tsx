import React from 'react';

import {EntityCard} from '@/components';

import styles from './styles.less';
import {useOffersData} from './hooks/useOffersData';

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
            {
                offers.length ? offers.map(
                    ({name, id}) => <EntityCard name={name} key={id} />,
                ) : 'empty'
            }
        </div>
    );
};

export default OffersSection;
