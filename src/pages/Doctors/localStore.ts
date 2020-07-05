import {action} from 'mobx';

import {BaseServiceStore} from '@/helpers/basicStore';
import {getDoctors} from '@/services/doctors';
import {clientifyDoctor} from '@/entities/doctor/transformers';
import {doctorStore} from '@/entities/doctor/store';

export class DoctorsGetStore extends BaseServiceStore {
    @action
    getDoctors = async () => {
        this.error = null;
        this.loading = true;

        const doctorsRes = await getDoctors();

        if (doctorsRes.ok === false) {
            this.error = doctorsRes.error;
        } else {
            const clientifiedDoctors = doctorsRes.data.doctors.map(clientifyDoctor);

            doctorStore.setDoctors(clientifiedDoctors);
        }

        this.loading = false;
    }
}

export const doctorsGetStore = new DoctorsGetStore();
