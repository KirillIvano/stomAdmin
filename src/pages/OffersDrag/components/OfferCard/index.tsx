import React, {useState} from 'react';
import styles from './styles.less';
import classnames from 'classnames';

type OfferCardProps = {
    name: string;
    price: number;
    additionalOffset?: number;
    index: number;

    isDragged: boolean;

    onDragStart: (index: number) => void;
    onDragUpdate: (position: number) => void;
    onDragEnd: (position: number) => void;
 };

const OfferCard = ({
    name,
    price,
    additionalOffset,
    index,

    onDragStart,
    onDragUpdate,
    onDragEnd,
    isDragged,
}: OfferCardProps) => {
    const [dragState, setDragState] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const handleDragStart = (e: React.MouseEvent) => {
        setDragOffset(e.pageY);
        onDragStart(index);
    };

    const handleMove = (e: React.MouseEvent) => {
        const {pageY} = e;

        if (isDragged && pageY !== dragOffset) {
            setDragState(e.pageY - dragOffset);
            onDragUpdate(e.pageY);
        }
    };

    const handleDragEnd = (e: React.MouseEvent) => {
        setDragOffset(0);
        setDragState(0);
        onDragEnd(e.pageY);
    };

    let translateY = 0;

    if (isDragged) {
        translateY = dragState;
    } else if (additionalOffset) {
        translateY = additionalOffset;
    }

    return (
        <div
            onMouseDown={handleDragStart}

            onMouseMove={handleMove}

            onMouseUp={isDragged ? handleDragEnd : null}
            onMouseLeave={isDragged ? handleDragEnd : null}

            style={{transform: `translateY(${translateY}px)`}}

            className={
                classnames(
                    styles.offerCard,
                    {[styles.active]: isDragged},
                )
            }
        >
            <div className={styles.offerName}>
                {name}
            </div>
            <div className={styles.offerPrice}>
                {price}
            </div>
        </div>
    );
};

export default OfferCard;
