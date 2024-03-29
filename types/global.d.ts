import {compose} from 'redux';



declare global {
    const SERVER_ORIGIN: string;
    const PASSWORD: string;

    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
