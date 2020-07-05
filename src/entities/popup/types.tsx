export type PopupMessageType = 'error' | 'success' | 'normal'

export type PopupMessage = {
    text: string;
    id: string;
    type: PopupMessageType;
}
