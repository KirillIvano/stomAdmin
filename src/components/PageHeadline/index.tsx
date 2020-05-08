import React from 'react';

import styles from './styles.less';

interface PageHeadlineProps {
    children: string;
}

const PageHeadline = ({
    children,
}) => (
    <h2 className={styles.pageHeadline}>{children}</h2>
);

const enchantedPageHeadline = React.memo(PageHeadline);

export default enchantedPageHeadline;
