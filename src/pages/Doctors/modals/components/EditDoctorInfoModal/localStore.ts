import {action} from 'mobx';

import {doctorStore} from '@/entities/doctor/store';
import {clientifyDoctor} from '@/entities/doctor/transformers';
import {updateDoctorInfo} from '@/services/doctors';
import {ServiceStore} from '@/helpers/basicStore';


class DoctorInfoUpdateState extends ServiceStore {
    @action
    updateDoctorInfo = async ({
        id,
        name,
        info,
    }: {id: string; name?: string; info?: string}) => {
        this.reset();

        const doctorUpdateRes = await updateDoctorInfo({
            id: +id,
            name,
            info,
        });

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

export const doctorInfoUpdateState = new DoctorInfoUpdateState();
