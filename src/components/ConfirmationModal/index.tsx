import React from 'react';

import {Modal, Button} from '@/uikit';

import styles from './styles.less';

type ConfirmationModalProps = {
    headline: string;
    content: string;
    isOpen: boolean;

    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmationModal = ({
    headline,
    content,
    isOpen,

    handleClose,
    handleConfirm,
}: ConfirmationModalProps) => (
    <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        closable={false}
    >
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.content}>{content}</p>

        <div className={styles.controlsBlock}>
            <Button
                className={styles.controlButton}
                onClick={handleConfirm}
            >
                Подтвердить
            </Button>
            <Button
                className={styles.controlButton}
                onClick={handleClose}
            >
                Отмена
            </Button>
        </div>
    </Modal>
);


export default ConfirmationModal;
