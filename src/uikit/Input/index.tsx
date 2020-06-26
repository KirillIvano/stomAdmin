import React, {useMemo} from 'react';
import classnames from 'classnames';

import {generateUniqueId} from '@/helpers/generateUniqueId';

import styles, { label } from './styles.less';

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;

    className?: string;
    type?: string;
}

const Input: React.FC<InputPropsType> = ({
    className,
    type='text',
    labelText,
    placeholder,

    ...props
}) => {
    const inputId = useMemo(() => generateUniqueId(), []);

    return (
        <div className={styles.inputWrapper}>
            <label
                htmlFor={inputId}
                className={styles.label}
            >
                {labelText}
            </label>

            <input
                {...props}

                className={classnames(
                    styles.input,
                    {
                        [className]: Boolean(className),
                    },
                )}

                placeholder={placeholder || 'Начните ввод...'}

                id={inputId}
                type={type}
            />
        </div>
    );
};

export default Input;
