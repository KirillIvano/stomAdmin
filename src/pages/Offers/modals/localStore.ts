import {observable, action} from 'mobx';

export type OfferPageModalName =
    'offer_create' |
    'offer_edit' |
    'offer_delete' |
    'category_create' |
    'category_edit' |
    'category_delete'

class OfferPageModalState<T extends object> {
    @observable
    openedModal: OfferPageModalName | null = null;
    @observable
    selectedId: string;

    @action
    openModal = async (modalName: OfferPageModalName, selectedId?: string) => {
        this.openedModal = modalName;
        this.selectedId = selectedId;
    }
    @action
    closeModal = async () => {
        this.openedModal = null;
    }
}

export const offersModalState = new OfferPageModalState();
