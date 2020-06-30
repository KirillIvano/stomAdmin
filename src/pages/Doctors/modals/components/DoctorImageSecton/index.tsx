import React from 'react';

import {
    Button,
    ModalControls,
} from '@/uikit';
import {useImagePreview} from '@/hooks/useImagePreview';

import {DoctorImageFormContent} from './..';

type ImageStageProps = {
    image: File;
    setImage: (file: File) => void;

    close: () => void;
    goForward: () => void;
}

const DoctorImageSection = ({
    image,
    setImage,

    close,
    goForward,
}: ImageStageProps) => {
    const imageUrl = useImagePreview(image);

    return (
        <>
            <DoctorImageFormContent
                setImage={setImage}
                imageUrl={imageUrl}
            />

            <ModalControls>
                <Button onClick={close} styling='warning'>Отмена</Button>
                <Button onClick={goForward} type='submit'>Дальше</Button>
            </ModalControls>
        </>
    );
};

export default DoctorImageSection;
