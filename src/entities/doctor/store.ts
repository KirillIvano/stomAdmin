import {observable, action} from 'mobx';

import {Doctor} from './types';

export class DoctorStore {
    @observable.ref
    doctors: Doctor[] = [];

    getDoctorbyId = (doctorId: string) => {
        return this.doctors.find(doctor => doctor.id === doctorId);
    }

    @action
    addDoctor = (doctor: Doctor) => {
        this.doctors = [...this.doctors, doctor];
    }

    @action
    setDoctors = (newDoctors: Doctor[]) => {
        this.doctors = newDoctors;
    }

    @action
    addDoctors = (newDoctors: Doctor[]) => {
        this.doctors = [...this.doctors, ...newDoctors];
    }

    @action
    updateDoctor = (updatedDoctor: Doctor) => {
        const doctorsCopy = [...this.doctors];
        const doctorIndex = doctorsCopy
            .findIndex(doctor => doctor.id === updatedDoctor.id);

        doctorsCopy[doctorIndex] = updatedDoctor;

        this.doctors = doctorsCopy;
    }

    @action
    removeDoctor = (doctorId: string) => {
        this.doctors = this.doctors.filter(
            ({id}) => id !== doctorId,
        );
    }
}

export const doctorStore = new DoctorStore();
