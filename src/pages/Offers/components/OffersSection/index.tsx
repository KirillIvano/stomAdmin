import React, {useEffect, useMemo} from 'react';
import {observer} from 'mobx-react';

import {EntityCard} from '@/components';
import {offerStore} from '@/entities/offer/store';
import {
    ErrorView,
    Preloader,
} from '@/uikit';

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
        const {
            getOffers,
            offerGettingInProgress,
            offerGettingError,
        } = getOffersState;

        useEffect(() => {getOffers(categoryId);}, []);

        const filteredOffers = useMemo(
            () => offerStore
                .offersArray
                .filter(offer => offer.categoryId === categoryId),
            [offerStore.offersArray],
        );

        if (offerGettingInProgress) return <Preloader />;
        if (offerGettingError) return <ErrorView>{offerGettingError}</ErrorView>;

        return (
            <div className={styles.offersSection}>
                {
                    !filteredOffers.length ?
                        'Нет предложений' :
                        filteredOffers.map(
                            ({name, id}) => (<EntityCard
                                handleDeleteClick={openDeleteModal}
                                handleEditClick={openEditModal}

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
