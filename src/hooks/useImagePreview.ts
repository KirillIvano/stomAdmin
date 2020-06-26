import {useState, useEffect} from 'react';

export const useImagePreview = () => {
    const [file, setFile] = useState<File>(null);
    const [imageUrl, setImageUrl] = useState<string>(null);

    useEffect(
        () => {
            if (file) {
                const newUrl = URL.createObjectURL(file);

                setImageUrl(newUrl);

                return () => URL.revokeObjectURL(newUrl);
            }
        },
        [file],
    );

    return {
        setFile,
        imageUrl,
    };
};

