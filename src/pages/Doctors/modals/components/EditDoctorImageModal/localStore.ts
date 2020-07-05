import {action} from 'mobx';

import {doctorStore} from '@/entities/doctor/store';
import {clientifyDoctor} from '@/entities/doctor/transformers';
import {updateDoctorImage} from '@/services/doctors';
import {ServiceStore} from '@/helpers/basicStore';


class DoctorImageUpdateState extends ServiceStore {
    @action
    updateDoctorInfo = async (doctorId: string, image: File) => {
        this.reset();

        const doctorUpdateRes = await updateDoctorImage(+doctorId, image);

        if (doctorUpdateRes.ok === false) {
            this.error = doctorUpdateRes.error;
        } else {
            const clientifiedDoctor = clientifyDoctor(doctorUpdateRes.data.doctor);

            doctorStore.updateDoctor(clientifiedDoctor);
            this.success = true;
        }

        this.loading = false;
    }
}

export const doctorImageUpdateState = new DoctorImageUpdateState();
