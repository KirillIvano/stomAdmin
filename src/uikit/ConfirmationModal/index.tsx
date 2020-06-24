import React from 'react';

import {Modal, Button, ErrorView} from '@/uikit';

import styles from './styles.less';

type ConfirmationModalProps = {
    isOpen: boolean;
    content: string;
    disabled?: boolean;
    error?: string | null;

    onConfirm: () => void;
    onReject: () => void;
}

const ConfirmationModal = ({
    isOpen,
    content,
    disabled,
    error,

    onConfirm,
    onReject,
}: ConfirmationModalProps) => (
    <Modal
        isOpen={isOpen}
        closable={false}
        className={styles.modal}
    >
        <p className={styles.content}>{content}</p>

        <div className={styles.controls}>
            <Button
                disabled={disabled}
                onClick={onConfirm}
            >
                Подтвердить
            </Button>

            <Button
                disabled={disabled}
                onClick={onReject}
                styling={'warning'}
            >
                Отмена
            </Button>
        </div>

        {error && <ErrorView>{error}</ErrorView>}
    </Modal>
);

export default ConfirmationModal;
