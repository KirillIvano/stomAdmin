import React from 'react';
import classnames from 'classnames';
import ReactModal from 'react-modal';

import styles from './styles.less';
import closeIconSrc from './images/close.svg';


interface ModalControlsProps extends React.BaseHTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const ModalControls = ({
    className,

    ...props
}: ModalControlsProps) => (
    <div
        className={classnames(
            className,
            styles.modalControls,
        )}
        {...props}
    />
);

type ModalProps = {
    isOpen: boolean;
    className?: string;
    closable?: boolean;

    children: React.ReactNode;

    handleClose?: () => void;
}

const Modal = ({
    isOpen,
    className,
    closable=false,
    children,

    handleClose,
}: ModalProps) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}

            shouldCloseOnEsc={closable}
            shouldCloseOnOverlayClick={closable}

            overlayClassName={styles.modalOverlay}
            className={classnames(
                styles.modal,
                className,
            )}
        >
            {
                closable && <img
                    onClick={handleClose}
                    src={closeIconSrc}
                    className={styles.closeIcon}
                />
            }

            {children}
        </ReactModal>
    );
};

ReactModal.setAppElement(document.body);

export default Modal;
