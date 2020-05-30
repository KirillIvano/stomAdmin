import React from 'react';

import image from './images/preloader.svg';
import styles from './styles.less';

const Preloader: React.FC = () => (
    <div className={styles.preloaderContainer}>
        <img className={styles.preloader} src={image} alt="preloader" />
    </div>
);

const enchancedPreloader = React.memo(Preloader);

export default enchancedPreloader;
