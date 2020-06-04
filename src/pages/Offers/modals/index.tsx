import React from 'react';
import {Subtract} from 'utility-types';

import {OffersModalContext} from './context';
import {useOffersModalsReducer} from './hooks';
import {ModalManager} from './modals';
import {ModalType} from './types';

type AdditionalPropsType = {
    openedModal: ModalType;
};

export const withModalManager = <T extends AdditionalPropsType,>(Comp: React.ComponentType<T>) =>
    (props: Subtract<T, AdditionalPropsType>) => {
        const context = useOffersModalsReducer();

        return (<OffersModalContext.Provider value={context}>
            <Comp {...props as T} openedModal={context.state.openedModal} />
            <ModalManager />
        </OffersModalContext.Provider>);
    };
