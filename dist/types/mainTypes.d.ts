/**
 * types for HB API
 */
export declare class HbApi {
    constructor({ apiBaseUrl, profileConfig, logger, httpClient, }: {
        apiBaseUrl: string;
        profileConfig: {
            accessKey: string;
            secretKey: string;
        };
        logger?: Logger;
        httpClient?: HttpClient<HbRawAPIResponse>;
    });
    /**
     * Generic REST API call with handle of signature
     * @param {*} param0
     */
    restApi({ path, method, query, body, timeout, }: {
        path: string;
        method: string;
        query?: Record<string, unknown>;
        body?: Record<string, unknown>;
        timeout?: number;
    }): Promise<unknown | null>;
}
/**
 * HB API returning type
 */
export declare type HbApiResponse = Record<string, unknown> | unknown[] | null;
/**
 * Logger interface
 */
export declare interface Logger {
    info: (msg: string, params?: Record<string, unknown>) => void;
    debug: (msg: string, params?: Record<string, unknown>) => void;
    error: (msg: string, params?: Record<string, unknown>) => void;
    [propName: string]: any;
}
/**
 * HTTP client interface
 */
export declare type HttpClient<T> = (args: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    query?: any;
    body?: any;
    timeout?: number;
    [propName: string]: any;
}) => Promise<{
    status: number;
    headers: Record<string, string>;
    data: T;
    [propName: string]: any;
}>;
/**
 * Raw HB API response type
 */
export declare interface HbRawAPIResponse {
    status?: string;
    code?: number;
    data: HbApiResponse;
}
