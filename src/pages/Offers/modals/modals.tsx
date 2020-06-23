import React from 'react';
import {observer} from 'mobx-react';

import {CreateOfferModal} from './components';
import {offersModalState} from './localStore';

export const ModalManager =  observer(() => {
    const {openedModal, selectedId, closeModal} = offersModalState;

    return (<>
        {/* <OfferDeleteModal
            isOpen={openedModal === 'offer_delete'}
            close={close}
            entityId={selectedItemId}
        /> */}

        <CreateOfferModal
            isOpened={openedModal === 'offer_create'}
            close={closeModal}
            categoryId={selectedId}
        />
    </>);
});

type CommonModalProps = {
    entityId: number;
    isOpen: boolean;
    close: () => void;
}
