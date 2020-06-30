import React, {useState} from 'react';

import {ModalControls, Button} from '@/uikit';

import {DoctorInfoFormContent} from './../';

type EditDoctorInfoModalProps = {
    isOpened: boolean;
    selectedId: string;

    close: () => void;
}

const EditDoctorInfoModal = ({
    isOpened,
    selectedId,

    close,
}: EditDoctorInfoModalProps) => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');

    return (
        <form onSubmit={() => {
            close();
        }}>
            <DoctorInfoFormContent
                {...{name, info, setName, setInfo}}
            />

            <ModalControls>
                <Button isDisabled={isOpened}>Отмена</Button>
                <Button isDisabled={isOpened}>Подтвердить</Button>
            </ModalControls>
        </form>
    );
};

export default EditDoctorInfoModal;
