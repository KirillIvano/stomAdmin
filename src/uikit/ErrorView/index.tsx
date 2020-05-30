import React from 'react';

import styles from './styles.less';

interface ErrorViewProps {
    children: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({
    children,
}) => (
    <div className={styles.errorView}>
        <h2 className={styles.errorHeadline}>Произошла ошибка</h2>
        <p className={styles.errorText}>{children}</p>
    </div>
);

const enchancedErrorView = React.memo(ErrorView);

export default enchancedErrorView;
