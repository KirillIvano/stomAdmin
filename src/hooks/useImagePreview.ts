import {useState, useEffect} from 'react';

export const useImagePreview = (imageFile: File, defaultImage?: string): string => {
    const [imageUrl, setImageUrl] = useState<string>(defaultImage);

    useEffect(
        () => {
            if (imageFile) {
                const newUrl = URL.createObjectURL(imageFile);

                setImageUrl(newUrl);

                return () => URL.revokeObjectURL(newUrl);
            } else {
                setImageUrl(null);
            }
        },
        [imageFile],
    );

    return imageUrl;
};

