import {action} from 'mobx';

import {doctorStore} from '@/entities/doctor/store';
import {clientifyDoctor} from '@/entities/doctor/transformers';
import {createDoctor} from '@/services/doctors';
import {ServiceStore} from '@/helpers/basicStore';

class DoctorCreateState extends ServiceStore {
    @action
    createDoctor = async (
        name: string,
        info: string,
        image: File,
    ) => {
        const doctorCreateRes = await createDoctor({
            name,
            info,
            image,
        });

        if (doctorCreateRes.ok === false) {
            this.error = doctorCreateRes.error;
        } else {
            const clientifiedDoctor = clientifyDoctor(doctorCreateRes.data.doctor);

            doctorStore.addDoctor(clientifiedDoctor);
            this.success = true;
        }

        this.loading = false;
    }
}

export const doctorCreateState = new DoctorCreateState();
