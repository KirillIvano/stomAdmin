import React, { useEffect } from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';

import {doctorDeleteState} from './localStore';

type DeleteDoctorModalProps = {
    isOpened: boolean;
    selectedId: string;

    close: () => void;
}

const DeleteDoctorModal = observer(({
    isOpened,
    selectedId,

    close,
}: DeleteDoctorModalProps) => {
    const {
        loading,
        error: deletingError,
        reset: resetDeleting,
        success: deletingSuccess,
        deleteDoctor,
    } = doctorDeleteState;

    useEffect(() => {
        if (deletingSuccess) {
            close();
            resetDeleting();
        }
    }, [deletingSuccess]);

    return (
        <ConfirmationModal
            isOpen={isOpened}
            content={'Вы точно хотите удалить запись об этом враче?'}
            disabled={loading}
            error={deletingError}

            onReject={close}
            onConfirm={() => deleteDoctor(selectedId)}
        ></ConfirmationModal>
    );
});

export default DeleteDoctorModal;
