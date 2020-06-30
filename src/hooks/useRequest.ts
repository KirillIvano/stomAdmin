import {useState, useCallback} from 'react';

import {DataType} from '@/helpers/jsonFetch';

export const useRequest = <
    TData extends object,
    TParams
>(dataGetter: (req: TParams) => Promise<DataType<TData>>, loadOnInit = false) => {
    const [state, setLoadingState] =
        useState<{
            loading: boolean;
            error: string | null;
            data?: TData;
            success: boolean;
        }>({loading: loadOnInit, error: null, success: false});

    const handleLoad = (data: TData) => setLoadingState({...state, loading: false, data, success: true});
    const handleError = (error: string) => setLoadingState({loading: false, error, success: false});

    const start = useCallback(
        (params?: TParams): void => {
            setLoadingState({loading: true, error: null, success: false});

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
