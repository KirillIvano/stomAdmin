import {useEffect, useState} from 'react';


export const useDataLoad = <T>(dataGetter: () => Promise<T>) => {
    const [state, setLoadingState] =
        useState<{loading: boolean; error?: string; data?: T}>({loading: true});

    const handleLoad = (data: T) => setLoadingState({loading: false, data});
    const handleError = (error: string) => setLoadingState({loading: false, error});

    useEffect(
        () => {
            dataGetter()
                .then(handleLoad)
                .catch(handleError);
        }, [],
    );

    return state;
};
