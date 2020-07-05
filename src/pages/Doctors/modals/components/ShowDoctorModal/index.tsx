import React from 'react';

import {SmartModalProps} from '@/helpers/modals';
import {
    ImagePreview,
    ModalControls,
    Modal,
    Button,
    PropView,
} from '@/uikit';
import {doctorStore} from '@/entities/doctor/store';

import styles from './styles.less';

const ShowDoctorModal = ({
    isOpened,
    selectedId,
    close,
}: SmartModalProps) => {
    const {name, info, image} = doctorStore.doctors.find(doc => doc.id === selectedId);

    return (
        <Modal
            isOpen={isOpened}
            closable={true}

            handleClose={close}
        >
            <ImagePreview className={styles.imagePreview} imageUrl={`http://localhost:5000/images/${image}`} />

            <PropView name={'Имя'} value={name} />
            <PropView name={'Информация'} value={info} />

            <ModalControls>
                <Button onClick={close}>Закрыть</Button>
            </ModalControls>
        </Modal>
    );
};

export default ShowDoctorModal;
