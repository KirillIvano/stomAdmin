import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {EntityCard} from '@/components';
import {offerStore} from '@/entities/offer/store';

import {getOffersState} from './localStore';
import styles from './styles.less';

interface OffersSectionProps {
    categoryId: string;
    openEditModal?: (id: string) => void;
    openDeleteModal?: (id: string) => void;
}

const OffersSection: React.FC<OffersSectionProps> = observer(
    ({
        categoryId,
        openEditModal,
        openDeleteModal,
    }) => {
        const {getOffers} = getOffersState;

        useEffect(() => {getOffers(categoryId);}, []);

        console.log(categoryId, offerStore.offersArray);

        return (
            <div className={styles.offersSection}>
                {
                    offerStore
                        .offersArray
                        .filter(offer => offer.categoryId === categoryId)
                        .map(
                            ({name, id}) => (<EntityCard
                                name={name}
                                id={id}
                                key={id}
                            />),
                        )
                }
            </div>
        );
    },
);

const enchancedOfferSection = OffersSection;

export default enchancedOfferSection;
