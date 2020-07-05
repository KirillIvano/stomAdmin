import React, { useEffect } from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';
import {SmartModalProps} from '@/helpers/modals';

import {doctorDeleteState} from './localStore';


const DeleteDoctorModal = observer(({
    isOpened,
    selectedId,

    close,
}: SmartModalProps) => {
    const {
        loading,
        error: deletingError,
        reset: resetDeleting,
        success: deletingSuccess,
        deleteDoctor,
    } = doctorDeleteState;

    useEffect(() => {
        if (deletingSuccess) {
            resetDeleting();
            close();
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
