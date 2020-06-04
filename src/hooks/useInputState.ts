import {useState} from 'react';

export const useInputState = <TVal>(initialValue: TVal) => {
    const [value, setValue] = useState<TVal>(initialValue);
    const [error, setError] = useState<string>(null);

    return [
        value,
        setValue,
        error,
        setError,
    ] as [typeof value, typeof setValue, typeof error, typeof setError];
};
