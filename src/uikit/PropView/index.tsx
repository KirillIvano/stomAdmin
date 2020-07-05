import React from 'react';

import styles from './styles.less';

type PropViewProps = {
    name: string;
    value: string;
}

const PropView = ({
    name,
    value,
}: PropViewProps) => (
    <div className={styles.propView}>
        <h3 className={styles.propName}>{name}</h3>
        <p className={styles.propValue}>{value}</p>
    </div>
);


export default React.memo(PropView);
