import React from 'react';
import {Subtract} from 'utility-types';

import {ModalManager} from './modals';
import {ModalType} from './types';

type AdditionalPropsType = {
    openedModal: ModalType;
};

export const withModalManager = <T extends AdditionalPropsType,>(Comp: React.ComponentType<T>) =>
    (props: Subtract<T, AdditionalPropsType>) => (
        <>
            <Comp {...props as T} />
            <ModalManager />
        </>
    );

