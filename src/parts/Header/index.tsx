import React from 'react';

import {LayoutContainer} from '@/uikit';

import styles from './styles.less';
import {HeaderLink, HeaderIcon} from './components';
import { useLocation } from 'react-router-dom';

const linksConfigs: [string, string][] = [
    ['/doctors', 'Врачи'],
    ['/offers', 'Услуги'],
    ['/previews', 'Превью'],
];

const HeaderNav = () => {
    const {pathname} = useLocation();

    return (
        <nav className={styles.headerNav}>
            {
                linksConfigs.map(
                    ([path, name]) => (
                        <HeaderLink
                            key={path}
                            to={path}
                            isSelected={pathname === path}
                        >
                            {name}
                        </HeaderLink>
                    ),
                )
            }
        </nav>
    );
};

const Header = () => {
    return (
        <header className={styles.header}>
            <LayoutContainer className={styles.headerContent}>
                <HeaderIcon />
                <HeaderNav />
            </LayoutContainer>
        </header>
    );
};

export default Header;
