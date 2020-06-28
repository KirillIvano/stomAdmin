import React from 'react';
import {Link, LinkProps} from 'react-router-dom';
import classnames from 'classnames';

import styles from './styles.less';

interface HeaderLinkProps extends LinkProps {
    isSelected: boolean;
}

const HeaderLink = ({isSelected, ...props}: HeaderLinkProps) =>
    (<Link
        {...props}
        className={
            classnames(
                styles.link,
                {
                    [styles.selected]: isSelected,
                },
            )
        }
    />);


export default HeaderLink;
