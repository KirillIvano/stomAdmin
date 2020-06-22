import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type?: string;
}

const Input: React.FC<InputPropsType> = ({
    className,
    type='text',
    ...props
}) => (
    <input
        {...props}
        className={classnames(
            styles.input,
            {
                [className]: Boolean(className),
            },
        )}
        type={type}
    />
);

export default Input;
