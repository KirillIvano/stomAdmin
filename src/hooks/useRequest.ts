import {useState, useCallback} from 'react';

import {DataType} from '@/helpers/jsonFetch';

export const useRequest = <
    TData extends object,
    TParams
>(dataGetter: (req: TParams) => Promise<DataType<TData>>, loadOnInit = false) => {
    const [state, setLoadingState] =
        useState<{
            loading: boolean;
            error?: string;
            data?: TData;
            loaded?: boolean;
        }>({loading: loadOnInit, loaded: false});

    const handleLoad = (data: TData) => setLoadingState({loading: false, data, loaded: true});
    const handleError = (error: string) => setLoadingState({loading: false, error, loaded: false});

    const start = useCallback(
        (params?: TParams): void => {
            setLoadingState({loading: true, error: undefined, loaded: false});

            dataGetter(params).then(
                res => res.ok === false ?
                    handleError(res.error) :
                    handleLoad(res.data),
            );
        }, [state.loading],
    );

    return [
        start,
        state,
    ] as [typeof start, typeof state];
};
