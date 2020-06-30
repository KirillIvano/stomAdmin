import React from 'react';

import {
    ImagePreview,
    FileInput,
} from '@/uikit';

type DoctorImageFormProps = {
    imageUrl: string;
    setImage: (file: File) => void;
}

const DoctorImageForm = ({
    imageUrl,

    setImage,
}: DoctorImageFormProps) => (
    <>
        <ImagePreview imageUrl={imageUrl} />
        <FileInput
            labelText={'Выберите фото сотрудника'}
            onChange={e => {
                const file = e.target.files[0];

                setImage(file);
            }}
        />
    </>
);

export default DoctorImageForm;
