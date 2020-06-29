import {observable, action} from 'mobx';

import {Doctor} from './types';

export class DoctorStore {
    @observable
    doctors = observable.array<Doctor>([], {deep: true});

    @action
    addDoctor = async (doctor: Doctor) => {
        this.doctors.push(doctor);
    }

    @action
    addDoctors = async (newDoctors: Doctor[]) => {
        this.doctors.replace(newDoctors);
    }

    @action
    updateDoctor = async (updatedDoctor: Doctor) => {
        const doctorIndex = this.doctors
            .findIndex(doctor => doctor.id === updatedDoctor.id);

        this.doctors[doctorIndex] = updatedDoctor;
    }

    @action
    removeDoctor = async (doctorId: string) => {

        const doctorIndex = this.doctors
            .findIndex(doctor => {
                doctor.id === doctorId;
            });

        delete this.doctors[doctorIndex];
    }
}

export const doctorStore = new DoctorStore();
