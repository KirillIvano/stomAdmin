import {action} from 'mobx';

import {doctorStore} from '@/entities/doctor/store';
import {deleteDoctor} from '@/services/doctors';
import {ServiceStore} from '@/helpers/basicStore';

class DoctorDeleteState extends ServiceStore {
    @action
    deleteDoctor = async (doctorId: string) => {
        this.reset();

        const doctorDeleteRes = await deleteDoctor(+doctorId);

        if (doctorDeleteRes.ok === false) {
            this.error = doctorDeleteRes.error;
        } else {
            doctorStore.removeDoctor(doctorId);
            this.success = true;
        }

        this.loading = false;
    }
}

export const doctorDeleteState = new DoctorDeleteState();
