import React, {useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';

import {ModalControls, Modal, Button, ErrorView} from '@/uikit';
import {doctorStore} from '@/entities/doctor/store';
import {useEffectedState} from '@/hooks/useEffectedState';
import {useImagePreview} from '@/hooks/useImagePreview';
import {SmartModalProps} from '@/helpers/modals';

import {DoctorImageFormContent} from './../';
import {doctorImageUpdateState} from './localStore';


const EditDoctorInfoModal = observer(({
    isOpened,
    selectedId,

    close,
}: SmartModalProps) => {
    const doctor = useMemo(() => doctorStore.getDoctorbyId(selectedId), [selectedId, isOpened]);

    const [image, setImage] = useEffectedState(null);
    const imageUrl = useImagePreview(image, doctor.image);

    const {loading, error, success} = doctorImageUpdateState;

    const reset = () => {
        setImage('');
    };

    useEffect(() => {
        if (success) {
            doctorImageUpdateState.reset();
            close();
            reset();
        }
    }, [success]);

    const handleConfirm = () =>
        doctorImageUpdateState.updateDoctorInfo(selectedId, image);

    return (
        <Modal
            isOpen={isOpened}
            closable={!loading}
            handleClose={close}
        >
            <DoctorImageFormContent imageUrl={imageUrl} setImage={setImage}  />

            <ModalControls>
                <Button onClick={close} styling='warning' isDisabled={loading}>Отмена</Button>
                <Button onClick={handleConfirm} isDisabled={loading}>Подтвердить</Button>
            </ModalControls>
            {error && <ErrorView>{error}</ErrorView>}
        </Modal>
    );
});

export default EditDoctorInfoModal;
