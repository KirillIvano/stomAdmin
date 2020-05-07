import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface ButtonPropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    isDisabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonPropsType> = ({
    children,
    isDisabled,
    className,

    ...props
}) => (
    <button
        disabled={isDisabled}
        className={classnames(
            styles.button,
            {
                [className]: Boolean(className),
                [styles.disabled]: isDisabled,
            },
        )}
        {...props}
    >
        {children}
    </button>
);

export default Button;
