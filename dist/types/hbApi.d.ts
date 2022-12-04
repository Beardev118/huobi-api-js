import { Logger, HttpClient, HbRawAPIResponse, HbApiResponse } from './mainTypes';
/**
 * API helper for HB
 */
declare class HbApi {
    private apiBaseUrl;
    private profileConfig;
    private logger;
    private httpClient;
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
    }): Promise<HbApiResponse>;
    /**
     * Build signed query string
     * @param {*} method
     * @param {*} baseurl
     * @param {*} path
     * @param {*} data
     */
    protected buildQueryStringWithSignedSHA({ method, baseUrl, path, signPayload, }: {
        method: string;
        baseUrl: string;
        path: string;
        signPayload: Record<string, string | number | boolean | unknown>;
    }): Record<string, string | number | boolean | unknown>;
    /**
     * Default payload for sign
     */
    private getDefaultSignPayload;
    /**
     * Low level Http call
     * @param {*} method
     * @param {*} path
     * @param {*} queryString
     * @param {*} body
     */
    private callApi;
}
export { HbApi };
