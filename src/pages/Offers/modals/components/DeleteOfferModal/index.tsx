import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';

import {deleteOfferState} from './localStore';
import {offerStore} from '@/entities/offer/store';

type DeleteOfferModalProps = {
    isOpened: boolean;
    selectedId: string;
    close: () => void;
}

const DeleteOfferModal = observer(({
    isOpened,
    selectedId: offerId,
    close,
}: DeleteOfferModalProps) => {
    const {
        loading: deletionLoading,
        error: deletionError,
        success: deletionSuccess,
    } = deleteOfferState;

    useEffect(
        () => {
            if (deletionSuccess) {
                offerStore.removeOffer(offerId);
                deleteOfferState.reset();
                close();
            }
        }, [deletionSuccess],
    );

    return (
        <ConfirmationModal
            content={'Вы точно хотите это удалить?'}
            isOpen={isOpened}
            disabled={deletionLoading}
            error={deletionError}

            onReject={close}
            onConfirm={() => deleteOfferState.deleteOffer(offerId)}
        />
    );
});

export default DeleteOfferModal;
