import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

import {ConfirmationModal} from '@/uikit';
import {SmartModalProps} from '@/helpers/modals';
import {offerStore} from '@/entities/offer/store';

import {offerDeleteState} from './localStore';


const DeleteOfferCategoryModal = observer(({
    isOpened,
    selectedId: categoryId,
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
                offerStore.removeOffer(categoryId);
                close();
            }
        }, [deletionSuccess],
    );

    return (
        <ConfirmationModal
            content={'Вы точно хотите удалить эту категорию и все содержащиеся в ней услуги?'}
            isOpen={isOpened}
            disabled={deletionLoading}
            error={deletionError}

            onReject={close}
            onConfirm={() => offerDeleteState.deleteCategory(categoryId)}
        />
    );
});

export default DeleteOfferCategoryModal;
