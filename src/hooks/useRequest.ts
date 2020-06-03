import {useState, useCallback} from 'react';

export const useRequest = <
    TData extends object,
    TParams
>(dataGetter: (req: TParams) => Promise<TData>) => {
    const [state, setLoadingState] =
        useState<{loading: boolean; error?: string; data?: TData}>({loading: true});

    const handleLoad = (data: TData) => setLoadingState({loading: false, data});
    const handleError = (error: string) => setLoadingState({loading: false, error});

    const start = useCallback(
        (params: TParams): void => {
            dataGetter(params)
                .then(handleLoad)
                .catch(handleError);
        }, [state.loading],
    );

    return [
        start,
        state,
    ] as [typeof start, typeof state];
};
