import React from 'react';
import classnames from 'classnames';

import {generateUniqueId} from '@/helpers/generateUniqueId';

import styles from './styles.less';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string;
    labelText: string;
}

const FileInput = ({
    wrapperClassName,
    labelText,

    ...props
}: FileInputProps) => {
    const inputId = generateUniqueId();

    return (
        <div className={classnames(styles.wrapper, wrapperClassName)}>
            <label
                className={styles.label}
                htmlFor={inputId}
            >
                {labelText}
            </label>

            <input
                {...props}
                id={inputId}
                className={styles.input}
                type="file"
            />
        </div>
    );
};
export default FileInput;
