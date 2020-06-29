import {Doctor} from './types';
import {DoctorDto} from '@/services/doctors/dto';

export const clientifyDoctor = (doctor: DoctorDto): Doctor => ({
    ...doctor,
    id: String(doctor.id),
});
