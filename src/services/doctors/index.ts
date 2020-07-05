import {jsonFetch} from '@/helpers/jsonFetch';
import {getRequestUrl} from '@/services/helpers';

import {DoctorDto} from './dto';

export const getDoctors = () => jsonFetch<{doctors: DoctorDto[]}>(
    getRequestUrl('/doctor'),
);

export const createDoctor = (
    {name, info, image}: {name: string; info: string; image: File},
) => {
    const data = new FormData();
    data.append('name', name);
    data.append('info', info);
    data.append('image', image);

    return jsonFetch<{doctor: DoctorDto}>(
        getRequestUrl('/doctor'),
        {
            method: 'POST',
            body: data,
        },
    );
};

export const deleteDoctor = (doctorId: number) =>
    jsonFetch(
        getRequestUrl(`/doctor/${doctorId}`),
        {method: 'DELETE'},
    );

export const updateDoctorInfo = ({id, info, name}: {id: number; info?: string; name?: string}) =>
    jsonFetch<{doctor: DoctorDto}>(
        getRequestUrl(`/doctor/${id}`),
        {
            method: 'PUT',
            body: JSON.stringify({info, name}),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

export const updateDoctorImage = (id: number, image: File) => {
    const data = new FormData();

    data.append('image', image);

    return jsonFetch<{doctor: DoctorDto}>(
        getRequestUrl(`/doctor/${id}/image`),
        {
            method: 'PUT',
            body: data,
        },
    );
};
