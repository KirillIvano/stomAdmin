import React, {useState} from 'react';
import styles from './styles.less';
import classnames from 'classnames';

type OfferCardProps = {
    name: string;
    price: number;
    additionalOffset?: number;
    index: number;
};

const OfferCard = ({
    name,
    price,
    additionalOffset,
    index,
}: OfferCardProps) => {
    const [isDragged, setDragged] = useState(false);
    const [dragState, setDragState] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);


    const handleDragStart = (e: React.MouseEvent) => {
        setDragged(true);
        setDragOffset(e.pageY);
    };

    const handleMove = (e: React.MouseEvent) => {
        if (isDragged) {
            setDragState(e.pageY - dragOffset);
        }
    };

    const handleDragEnd = () => {
        setDragged(false);
        setDragOffset(0);
        setDragState(0);
    };

    let translateY = 0;

    if (isDragged) {
        translateY = dragState;
    } else if (additionalOffset) {
        translateY = additionalOffset;
    }

    console.log(translateY);

    return (
        <div
            onMouseDown={handleDragStart}

            onMouseMove={handleMove}

            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}

            style={{transform: `translateY(${Math.round(translateY)}px)`}}

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
