import {createModalFacadeHOC} from '@/helpers/modals';

import {
    CreateDoctorModal,
    DeleteDoctorModal,
    EditDoctorInfoModal,
    EditDoctorImageModal,
    ShowDoctorModal,
} from './components';
import {DoctorModalType} from './types';

export const withModalManager = createModalFacadeHOC<DoctorModalType>({
    'doctor_create': CreateDoctorModal,
    'doctor_delete': DeleteDoctorModal,
    'doctor_update_image': EditDoctorImageModal,
    'doctor_update_info': EditDoctorInfoModal,
    'doctor_show': ShowDoctorModal,
});
