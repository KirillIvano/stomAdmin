import {useState, useEffect} from 'react';

export const useEffectedState = <TData>(initialState: TData) => {
    const state = useState<TData>(initialState);

    useEffect(() => state[1](initialState), [initialState]);

    return state;
};
