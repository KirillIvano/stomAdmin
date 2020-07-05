import {observable, action} from 'mobx';

import {PopupMessage, PopupMessageType} from './types';

class PopupMessagesStore {
    private messageId = 0;

    @observable.ref
    messages: PopupMessage[] = []

    @action
    removeMessage = (messageId: string) => {
        this.messages = this.messages.filter(message => message.id !== messageId);
    }

    @action
    private addMessage = (type: PopupMessageType, text: string) => {
        const message: PopupMessage = {
            type,
            text,
            id: String(++this.messageId),
        };

        this.messages = [...this.messages, message];
    }

    @action
    createSuccessMessage = (text: string) => {
        this.addMessage('success', text);
    }

    @action
    createErrorMessage = (text: string) => {
        this.addMessage('error', text);
    }
}

export const popupMessagesStore = new PopupMessagesStore();
