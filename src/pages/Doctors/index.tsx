import React, {useEffect, useContext} from 'react';
import {observer} from 'mobx-react';

import {
    LayoutContainer,
    Preloader,
    ErrorView,
    Button,
} from '@/uikit';
import {EntityCard, PageHeadline} from '@/components';
import {doctorStore} from '@/entities/doctor/store';
import {ModalFacadeContext} from '@/helpers/modals';
import {Doctor} from '@/entities/doctor/types';

import {doctorsGetStore} from './localStore';
import {withModalManager} from './modals';
import {DoctorModalType} from './modals/types';

const Doctors = React.memo(
    ({doctors}: {doctors: Doctor[]}) => {
        const openModal = useContext(ModalFacadeContext).openModal as (modalName: DoctorModalType, id?: string) => void;

        return (<div>
            {doctors.map(
                ({id, name}) =>
                    (<EntityCard
                        key={id}
                        id={id}
                        name={name}

                        handleBodyClick={() => openModal('doctor_show', id)}
                        handleEditClick={() => openModal('doctor_update_info', id)}
                        handleImageSelect={() => openModal('doctor_update_image', id)}
                        handleDeleteClick={() => openModal('doctor_delete', id)}
                    />),
            )}
        </div>);
    },
);
Doctors.displayName = 'Doctors';

const DoctorsPage = observer(() => {
    const {getDoctors, loading, error} = doctorsGetStore;
    const openModal = useContext(ModalFacadeContext).openModal as (modalName: DoctorModalType, id?: string) => void;

    useEffect(() => {
        getDoctors();
    }, []);

    if (loading) return <Preloader />;
    if (error) return <ErrorView>{error}</ErrorView>;

    return (
        <LayoutContainer>
            <PageHeadline>Врачи</PageHeadline>
            <Button onClick={() => openModal('doctor_create')}>Добавить врача</Button>

            <Doctors doctors={doctorStore.doctors} />
        </LayoutContainer>
    );
});

export default withModalManager(DoctorsPage);
