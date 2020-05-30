import React from 'react';
import classnames from 'classnames';
import ReactModal from 'react-modal';

import styles from './styles.less';

type ModalProps = {
    isOpen: boolean;
    className: string;
    closable: boolean;

    handleClose?: () => void;
}

const Modal = ({
    isOpen,
    className,
    closable,

    handleClose,
}: ModalProps) => {
    return (
        <ReactModal
            isOpen={isOpen}

            shouldCloseOnEsc={closable}
            shouldCloseOnOverlayClick={closable}
        >

        </ReactModal>
    );
};

export default Modal;
