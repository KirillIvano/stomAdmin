import React from 'react';

import {Input} from '@/uikit';

type DoctorInfoFormProps = {
    name: string;
    info: string;

    setName: (n: string) => void;
    setInfo: (info: string) => void;
}


const DoctorInfoForm = ({
    name,
    info,

    setName,
    setInfo,
}: DoctorInfoFormProps) => (
    <>
        <Input
            labelText={'Имя врача'}
            value={name}
            onChange={e => setName(e.currentTarget.value)}
        />
        <Input
            labelText={'Информация о враче'}
            value={info}
            onChange={e => setInfo(e.currentTarget.value)}
        />
    </>
);

export default DoctorInfoForm;
