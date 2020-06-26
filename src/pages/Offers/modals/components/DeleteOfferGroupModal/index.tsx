import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';

import {offerDeleteState} from './localStore';
import {offerStore} from '@/entities/offer/store';

type DeleteOfferCategoryModalProps = {
    isOpened: boolean;
    selectedId: string;
    close: () => void;
}

const DeleteOfferCategoryModal = observer(({
    isOpened,
    selectedId: categoryId,
    close,
}: DeleteOfferCategoryModalProps) => {
    const {
        loading: deletionLoading,
        error: deletionError,
        success: deletionSuccess,
    } = offerDeleteState;

    useEffect(
        () => {
            if (deletionSuccess) {
                offerStore.removeOffer(categoryId);
                offerDeleteState.reset();
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
            onConfirm={() => offerDeleteState.deleteCategory(categoryId)}
        />
    );
});

export default DeleteOfferCategoryModal;
