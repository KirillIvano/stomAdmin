import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';
import {offerStore} from '@/entities/offer/store';
import {SmartModalProps} from '@/helpers/modals';

import {offerDeleteState} from './localStore';


const DeleteOfferModal = observer(({
    isOpened,
    selectedId: offerId,
    close,
}: SmartModalProps) => {
    const {
        loading: deletionLoading,
        error: deletionError,
        success: deletionSuccess,
    } = offerDeleteState;

    useEffect(
        () => {
            if (deletionSuccess) {
                offerDeleteState.reset();
                offerStore.removeOffer(offerId);
                close();
            }
        }, [deletionSuccess],
    );

    return (
        <ConfirmationModal
            content={'Вы точно хотите удалить эту услугу?'}
            isOpen={isOpened}
            disabled={deletionLoading}
            error={deletionError}

            onReject={close}
            onConfirm={() => offerDeleteState.deleteOffer(offerId)}
        />
    );
});

export default DeleteOfferModal;
