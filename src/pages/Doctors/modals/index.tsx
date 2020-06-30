import {createModalFacadeHOC} from '@/helpers/modals';

import {CreateDoctorModal, DeleteDoctorModal} from './components';
import {DoctorModalType} from './types';

export const withModalManager = createModalFacadeHOC<DoctorModalType>({
    'doctor_create': CreateDoctorModal,
    'doctor_delete': DeleteDoctorModal,
    'doctor_update': CreateDoctorModal,
    'doctor_view': CreateDoctorModal,
});
