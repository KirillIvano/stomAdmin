type DataType<T extends object> = {
    data: T;
    ok: true;
} | {
    error: string;
    ok: false;
}

export const jsonFetch = async <T extends object,>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<DataType<T>> => {
    let body: {data: T} | {error: string};
    let ok: boolean;

    try {
        const res = await fetch(url, options);
        ok = res.ok;

        body = await res.json();
    } catch {
        return {error: 'Unexpected error', ok: false};
    }

    if (ok === false) {
        return {
            error: (body as {error: string}).error,
            ok,
        };
    }

    return {data: (body as {data: T}).data, ok};
};
