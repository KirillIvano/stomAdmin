import {action} from 'mobx';

import {doctorStore} from '@/entities/doctor/store';
import {clientifyDoctor} from '@/entities/doctor/transformers';
import {createDoctor} from '@/services/doctors';
import {ServiceStore} from '@/helpers/basicStore';


class DoctorInfoUpdateState extends ServiceStore {
    @action
    updateDoctorInfo = async ({
        name,
        info,
    }: {name?: string; info?: string}) => {
        this.reset();

        const offerCreateRes = await createDoctor({
            name,
            info,
        });

        if (offerCreateRes.ok === false) {
            this.error = offerCreateRes.error;
        } else {
            const clientifiedDoctor = clientifyDoctor(offerCreateRes.data.doctor);

            doctorStore.addDoctor(clientifiedDoctor);
            this.success = true;
        }

        this.loading = false;
    }
}

export const doctorCreateState = new DoctorInfoUpdateState();
