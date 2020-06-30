import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    Preloader,
    ErrorView,
} from '@/uikit';

import {doctorCreateState} from './localStore';
import {DoctorImageSection, DoctorInfoSection} from './..';

type CreateDoctorModalProps = {
    isOpened: boolean;
    close: () => void;
}

const CreateDoctorModal = observer(({
    isOpened,
    close,
}: CreateDoctorModalProps) => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [image, setImage] = useState<File>(null);

    const [validationError, setValidationError] = useState('');

    const [stage, setStage] = useState(0);

    const {
        loading: doctorCreatingLoading,
        success: doctorCreatingSuccess,
        error: doctorCreatingError,
    } = doctorCreateState;

    useEffect(() => {
        if (doctorCreatingSuccess) {
            doctorCreateState.reset();
            close();
        }
    }, [doctorCreatingSuccess]);

    const goBack = () => {
        if (stage > 0) setStage(stage - 1);
    };

    const confirmDoctorImage = () => {
        if (!image) {
            setValidationError('Картинка обязательна');
            return;
        }

        setValidationError('');
        setStage(1);
    };

    const confirmDoctorInfo = () => {
        if (!name || !info) {
            setValidationError('Имя и информация обязательны');
            return;
        }

        setValidationError('');
        setStage(2);

        doctorCreateState.createDoctor(name, info, image);
    };

    return (
        <Modal
            isOpen={isOpened}
            closable={!doctorCreatingLoading}
            handleClose={close}
        >
            {stage === 0 && <DoctorImageSection
                image={image}
                setImage={setImage}

                close={close}
                goForward={confirmDoctorImage}
            />}
            {stage === 1 && <DoctorInfoSection
                name={name}
                info={info}

                setName={setName}
                setInfo={setInfo}

                close={close}
                goBack={goBack}
                goForward={confirmDoctorInfo}
            />}
            {stage === 2 && <div><Preloader /></div>}

            {validationError && <ErrorView>{validationError}</ErrorView>}
            {doctorCreatingError && <ErrorView>{doctorCreatingError}</ErrorView>}
        </Modal>
    );
});

export default CreateDoctorModal;
