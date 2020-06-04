import {useState} from 'react';

export const useModalState = <TIndent=undefined>() => {
    const [isOpened, setOpened] = useState(false);

    const closeModal = () => setOpened(false);
    const openModal = () => setOpened(true);

    return [
        isOpened,
        openModal,
        closeModal,
    ];
};
