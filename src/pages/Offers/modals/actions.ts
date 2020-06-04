import {createAction, ActionType} from 'typesafe-actions';

export const OPEN_OFFER_GROUP_CREATE_MODAL: 'OPEN_OFFER_GROUP_CREATE_MODAL' = 'OPEN_OFFER_GROUP_CREATE_MODAL';
export const OPEN_OFFER_GROUP_EDIT_MODAL: 'OPEN_OFFER_GROUP_EDIT_MODAL' = 'OPEN_OFFER_GROUP_EDIT_MODAL';
export const OPEN_OFFER_GROUP_DELETE_MODAL: 'OPEN_OFFER_GROUP_DELETE_MODAL' = 'OPEN_OFFER_GROUP_DELETE_MODAL';

export const OPEN_OFFER_CREATE_MODAL: 'OPEN_OFFER_CREATE_MODAL' = 'OPEN_OFFER_CREATE_MODAL';
export const OPEN_OFFER_DELETE_MODAL: 'OPEN_OFFER_DELETE_MODAL' = 'OPEN_OFFER_DELETE_MODAL';
export const OPEN_OFFER_EDIT_MODAL: 'OPEN_OFFER_EDIT_MODAL' = 'OPEN_OFFER_EDIT_MODAL';

export const CLOSE_PRESENT_OFFER_MODAL: 'CLOSE_PRESENT_OFFER_MODAL' = 'CLOSE_PRESENT_OFFER_MODAL';

export const openOfferGroupCreateModal = createAction(OPEN_OFFER_GROUP_CREATE_MODAL)();
export const openOfferGroupEditModal = createAction(OPEN_OFFER_GROUP_EDIT_MODAL, (id: number) => id)();
export const openOfferGroupDeleteModal = createAction(OPEN_OFFER_GROUP_DELETE_MODAL, (id: number) => id)();

export const openOfferCreateModal = createAction(OPEN_OFFER_CREATE_MODAL, (groupId: number) => groupId)();
export const openOfferEditModal = createAction(OPEN_OFFER_EDIT_MODAL, (id: number) => id)();
export const openOfferDeleteModal = createAction(OPEN_OFFER_DELETE_MODAL, (id: number) => id)();

export const closePresentOfferModal = createAction(CLOSE_PRESENT_OFFER_MODAL)();

export const actions = {
    openOfferCreateModal,
    openOfferEditModal,
    openOfferDeleteModal,

    openOfferGroupCreateModal,
    openOfferGroupEditModal,
    openOfferGroupDeleteModal,

    closePresentOfferModal,
};

export type ModalActionType = ActionType<typeof actions>
