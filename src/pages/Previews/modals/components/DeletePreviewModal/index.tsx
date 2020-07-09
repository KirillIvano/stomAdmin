import React, { useEffect } from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';

import {previewDeleteStore} from './localStore';


type DeletePreviewModalProps = {
    selectedId: string;
    isOpened: boolean;

    close: () => void;
}

const DeletePreviewModal = observer(({
    selectedId,
    isOpened,

    close,
}: DeletePreviewModalProps) => {
    const {loading, error, success} = previewDeleteStore;

    useEffect(() => {
        if (success) {
            previewDeleteStore.reset();
            close();
        }
    }, [success]);

    return (
        <ConfirmationModal
            content={'Вы точно хотите удалить это превью?'}
            isOpen={isOpened}
            disabled={loading}
            error={error}

            onReject={close}
            onConfirm={() => previewDeleteStore.deletePreview(selectedId)}
        />
    );
});

export default DeletePreviewModal;
