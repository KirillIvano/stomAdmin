import React, {useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';

import {ModalControls, Modal, Button, ErrorView} from '@/uikit';
import {doctorStore} from '@/entities/doctor/store';
import {useEffectedState} from '@/hooks/useEffectedState';
import {SmartModalProps} from '@/helpers/modals';

import {DoctorInfoFormContent} from './../';
import {doctorInfoUpdateState} from './localStore';

const EditDoctorInfoModal = observer(({
    isOpened,
    selectedId,

    close,
}: SmartModalProps) => {
    const doctor = useMemo(() => doctorStore.getDoctorbyId(selectedId), [selectedId, isOpened]);

    const [name, setName] = useEffectedState(doctor.name);
    const [info, setInfo] = useEffectedState(doctor.info);

    const {loading, error, success} = doctorInfoUpdateState;

    const reset = () => {
        setName('');
        setInfo('');
    };

    useEffect(() => {
        if (success) {
            doctorInfoUpdateState.reset();
            close();
            reset();
        }
    }, [success]);

    const handleConfirm = () =>
        doctorInfoUpdateState.updateDoctorInfo({id: selectedId, name, info});

    return (
        <Modal
            isOpen={isOpened}
            closable={!loading}
            handleClose={close}
        >
            <form onSubmit={() => {
                close();
            }}>
                <DoctorInfoFormContent
                    {...{name, info, setName, setInfo}}
                />

                <ModalControls>
                    <Button onClick={close} styling='warning' isDisabled={loading}>Отмена</Button>
                    <Button onClick={handleConfirm} isDisabled={loading}>Подтвердить</Button>
                </ModalControls>
            </form>

            {error && <ErrorView>{error}</ErrorView>}
        </Modal>
    );
});

export default EditDoctorInfoModal;
