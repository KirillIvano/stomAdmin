export type ModalType = 'group_edit' |
    'group_delete' |
    'group_create' |
    'offer_edit' |
    'offer_delete' |
    'offer_create' | null;

export type OffersModalsStateType = {
    openedModal: ModalType;
    selectedItemId: number | null;
};
