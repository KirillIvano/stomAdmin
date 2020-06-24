import {createModalFacadeHOC} from '@/helpers/modals';

import {
    CreateOfferModal,
    DeleteOfferModal,
    UpdateOfferModal,
    CreateOfferGroupModal,
    DeleteOfferGroupModal,
    UpdateOfferGroupModal,
} from './components';
import {ModalType} from './types';

export const withModalManager = createModalFacadeHOC<ModalType>({
    'offer_create': CreateOfferModal,
    'offer_delete': DeleteOfferModal,
    'offer_edit': UpdateOfferModal,
    'group_create': CreateOfferGroupModal,
    'group_delete': DeleteOfferGroupModal,
    'group_edit': UpdateOfferGroupModal,
});
