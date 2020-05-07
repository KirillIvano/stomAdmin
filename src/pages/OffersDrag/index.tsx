import React, {useState, MouseEvent, useLayoutEffect, useRef} from 'react';

import {Offer} from '@/entities/offer/types';

import styles from './styles.less';
import {OfferCard} from './components';

const offersList: Offer[] = [
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
    {
        id: 5,
        name: 'as fadf sadg sadg sa',
        price: 12,
    },
];

const updateArray = (arr: Offer[], prevIndex: number, newIndex: number) => {
    const draggedOffer = arr[prevIndex];

    if (newIndex > prevIndex) {
        for (let i = prevIndex; i < newIndex; i++) {
            arr[i] = arr[i + 1];
        }
    } else if (newIndex < prevIndex) {
        for (let i = prevIndex; i > newIndex; i--) {
            arr[i] = arr[i - 1];
        }
    }

    arr[newIndex] = draggedOffer;
};

const OffersPage = () => {
    const offersSectionRef = useRef<HTMLDivElement>();
    const [isDragged, setDragged] = useState(false);
    const [offers, setOffers] = useState(offersList);
    const [heights, setHeights] = useState<number[]>();
    const [offsets, setOffsets] = useState<number[]>();
    const [draggedIndex, setDraggedIndex] = useState<number>(null);
    const [dragPosition, setDragPosition] = useState<number>(null);

    useLayoutEffect(() => {
        const boundingRects = [...offersSectionRef.current.children]
            .map(offerEl => offerEl.getBoundingClientRect());
        setHeights(boundingRects.map(rect => rect.height));
        setOffsets(boundingRects.map(rect => rect.top));
    }, []);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
        setDragged(true);
    };
    const handleDragUpdate = (position: number) => {
        setDragPosition(position);
    };
    const handleDragEnd = (position: number) => {
        let newIndex = offsets.findIndex(offset => offset >= position);
        if (newIndex === -1) newIndex = offsets.length - 1;

        const newOffers = [...offers];
        updateArray(newOffers, draggedIndex, newIndex);
        setOffers(newOffers);
        setDraggedIndex(null);
        setDragged(false);
    };

    return (
        <div className={styles.offersContainer} ref={offersSectionRef}>
            {
                offers.map(
                    ({name, id, price}, index) => (
                        <OfferCard
                            additionalOffset={
                                draggedIndex !== null &&
                                offsets[index] > dragPosition &&
                                index < draggedIndex &&
                                heights[draggedIndex]
                            }
                            key={id}
                            name={name}
                            price={price}
                            index={index}
                            isDragged={index === draggedIndex}

                            onDragStart={handleDragStart}
                            onDragUpdate={handleDragUpdate}

                            onDragEnd={handleDragEnd}
                        />
                    ),
                )
            }
        </div>
    );
};

export default OffersPage;
