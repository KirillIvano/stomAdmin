import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface ButtonPropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    isDisabled?: boolean;
    className?: string;
    styling?: 'normal' | 'warning';
}

const Button: React.FC<ButtonPropsType> = ({
    children,
    isDisabled,
    className,
    styling='normal',

    ...props
}) => (
    <button
        {...props}
        disabled={isDisabled}
        className={classnames(
            styles.button,
            {
                [className]: Boolean(className),
                [styles.danger]: styling === 'warning',
                [styles.disabled]: isDisabled,
            },
        )}
    >
        {children}
    </button>
);

const enchancedButton = React.memo(Button);

export default enchancedButton;
