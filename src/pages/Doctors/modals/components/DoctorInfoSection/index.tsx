import React from 'react';

import {
    ModalControls,
    Button,
} from '@/uikit';

import {DoctorInfoFormContent} from './..';

type DoctorInfoStageProps = {
    name: string;
    info: string;

    setName: (n: string) => void;
    setInfo: (info: string) => void;

    goBack: () => void;
    close: () => void;
    goForward: () => void;
}

const DoctorInfoStage = ({
    name,
    info,

    setName,
    setInfo,

    goBack,
    goForward,
}: DoctorInfoStageProps) => (
    <form onSubmit={e => {
        e.preventDefault();
        goForward();
    }}>
        <DoctorInfoFormContent
            {...{name, info, setName, setInfo}}
        />
        <ModalControls>
            <Button onClick={goBack}>Назад</Button>
            <Button onClick={close} styling='warning'>Отмена</Button>
            <Button type='submit'>Завершить</Button>
        </ModalControls>
    </form>
);

export default DoctorInfoStage;
