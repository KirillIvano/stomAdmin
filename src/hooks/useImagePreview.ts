import {useState, useEffect} from 'react';

export const useImagePreview = (imageFile: File): string => {
    const [imageUrl, setImageUrl] = useState<string>(null);

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

