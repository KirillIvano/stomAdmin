import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputPropsType> = ({
    className,
}) => (
    <input
        className={classnames(
            styles.input,
            {
                [className]: Boolean(className),
            },
        )}
        type="text"
    />
);

export default Input;
