import React, { useMemo } from 'react';
import classnames from 'classnames';
import {observer} from 'mobx-react';

import {popupMessagesStore} from '@/entities/popup/store';

import styles from './styles.less';

type PopupMessageProps = {
    id: string;
    text: string;
    styling: 'error' | 'success' | string;
}

const PopupMessage = ({
    id,
    text,
    styling,
}: PopupMessageProps) => {
    const messageClass = useMemo(
        () => classnames(
            styles.popupMessage,
            {
                [styles.success]: styling === 'success',
                [styles.error]: styling === 'error',
            },
        ), [styling],
    );

    return  (
        <div
            className={messageClass}
        >
            <p>{text}xxxxxxxxxxxxxxxxxxxxx</p>
        </div>
    );
};
const PopupBox = observer(() => {
    const {messages} = popupMessagesStore;

    return (
        <div className={styles.popupContainer}>
            {
                messages.map(({id, type, text}) => <PopupMessage key={id} {...{styling: type, id, text}} />)
            }
        </div>
    );
});

export default PopupBox;
