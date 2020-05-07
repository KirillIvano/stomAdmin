export const jsonFetch = async <T extends object,>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<T> => {
    let response: T | {error: string};
    try {
        response = await fetch(url, options).then(res => res.json());
    } catch {
        throw 'Неизвестная ошибка, зайдите позже';
    }

    if ('error' in response) throw response.error;

    return response;
};
