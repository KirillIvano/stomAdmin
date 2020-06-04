import {createReducer} from 'typesafe-actions';

import {actions, ModalActionType} from './actions';
import {OffersModalsStateType} from './types';

export const initialState: OffersModalsStateType = {
    openedModal: null,
    selectedItemId: null,
};

export const offersModalsReducer = createReducer<OffersModalsStateType, ModalActionType>(
    initialState,
).handleAction(
    actions.openOfferGroupCreateModal,
    state => ({...state, openedModal: 'group_create'}),
).handleAction(
    actions.openOfferGroupEditModal,
    (state, {payload: groupId}) => ({...state, openedModal: 'group_edit', selectedItemId: groupId}),
).handleAction(
    actions.openOfferGroupDeleteModal,
    (state, {payload: groupId}) => ({...state, openedModal: 'group_delete', selectedItemId: groupId}),

).handleAction(
    actions.openOfferCreateModal,
    (state, {payload: groupId}) => ({...state, openedModal: 'offer_create', selectedItemId: groupId}),
).handleAction(
    actions.openOfferEditModal,
    (state, {payload: offerId}) => ({...state, openedModal: 'offer_edit', selectedItemId: offerId}),
).handleAction(
    actions.openOfferDeleteModal,
    (state, {payload: offerId}) => ({...state, openedModal: 'offer_delete', selectedItemId: offerId}),

).handleAction(
    actions.closePresentOfferModal,
    () => initialState,
);
