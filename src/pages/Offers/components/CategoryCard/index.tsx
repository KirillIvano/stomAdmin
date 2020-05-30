import React, {useState} from 'react';

import styles from './styles.less';
import {OffersSection} from '..';

interface CategoryCardProps {
    categoryId: number;
    name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    categoryId,
    name,
}) => {
    const [isContentShown, setContentVisibility] = useState(false);

    return (
        <>
            <div
                className={styles.categoryCard}
                onClick={() => setContentVisibility(isVisible => !isVisible)}
            >
                <h1 className={styles.categoryName}>{name}</h1>
            </div>
            {isContentShown && <OffersSection categoryId={categoryId} />}
        </>
    );
};

export default CategoryCard;
