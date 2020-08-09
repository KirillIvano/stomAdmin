import qs from 'qs';

export const getRequestUrl = (path: string, args?: object) =>
    `${SERVER_ORIGIN}${path}?${qs.stringify(args)}`;
