import React, {useState, MouseEvent, useLayoutEffect, useRef} from 'react';

import {Offer} from '@/entities/offer/types';

import styles from './styles.less';
import {OfferCard} from './components';

const offers: Offer[] = [
    {
        id: 1,
        name: 'as fadf sadg sadg sa',
        price: 11122,
    },
    {
        id: 2,
        name: 'as fadf sadg sadg sa',
        price: 1132,
    },
    {
        id: 4,
        name: 'as fadf sadg sadg sa',
        price: 152,
    },
];

const OffersPage = () => {
    const offersSectionRef = useRef<HTMLDivElement>();
    const [heights, setHeights] = useState<number[]>([]);

    useLayoutEffect(() => {
        setHeights([...offersSectionRef.current.children]
            .map(offerEl => offerEl.getBoundingClientRect().height));
    }, []);

    return (
        <div ref={offersSectionRef}>
            {
                offers.map(
                    ({name, id, price}, index) => (
                        <OfferCard
                            key={id}
                            name={name}
                            price={price}
                            index={index}
                        />
                    ),
                )
            }
        </div>
    );
};

export default OffersPage;
