"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HbApi = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const moment_1 = __importDefault(require("moment"));
const crypto_js_2 = require("crypto-js");
const url_1 = __importDefault(require("url"));
const qs_1 = __importDefault(require("qs"));
const defaultLogger_1 = require("./defaultLogger");
const defaultHttpClient_1 = require("./defaultHttpClient");
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};
/**
 * API helper for HB
 */
class HbApi {
    constructor({ apiBaseUrl, profileConfig, logger, httpClient, }) {
        this.apiBaseUrl = apiBaseUrl;
        this.profileConfig = profileConfig;
        this.logger = logger || defaultLogger_1.logger;
        this.httpClient = httpClient || defaultHttpClient_1.httpClient;
    }
    /**
     * Generic REST API call with handle of signature
     * @param {*} param0
     */
    async restApi({ path, method, query, body, timeout = 5000, }) {
        const signPayload = { ...this.getDefaultSignPayload(), ...query };
        const baseUrl = url_1.default.parse(this.apiBaseUrl).host;
        if (!baseUrl) {
            const error = new Error('api base url invalid');
            this.logger.error(error.message, { error });
            throw error;
        }
        const signedQuery = this.buildQueryStringWithSignedSHA({
            method,
            baseUrl,
            path,
            signPayload,
        });
        return this.callApi({ method, path, query: signedQuery, body, timeout });
    }
    /**
     * Build signed query string
     * @param {*} method
     * @param {*} baseurl
     * @param {*} path
     * @param {*} data
     */
    buildQueryStringWithSignedSHA({ method, baseUrl, path, signPayload, }) {
        const params = Object.entries(signPayload).map((_) => _);
        params.sort((a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            return a[0] < b[0] ? -1 : 1;
        });
        const query = {};
        params.forEach(([k, v]) => {
            query[k] = v;
        });
        const queryString = qs_1.default.stringify(query);
        const meta = [method, baseUrl, path, queryString].join('\n');
        const hash = crypto_js_2.HmacSHA256(meta, this.profileConfig.secretKey);
        const signature = crypto_js_1.default.enc.Base64.stringify(hash);
        query['Signature'] = signature;
        return query;
    }
    /**
     * Default payload for sign
     */
    getDefaultSignPayload() {
        return {
            AccessKeyId: this.profileConfig.accessKey,
            SignatureMethod: 'HmacSHA256',
            SignatureVersion: 2,
            Timestamp: moment_1.default.utc().format('YYYY-MM-DDTHH:mm:ss'),
        };
    }
    /**
     * Low level Http call
     * @param {*} method
     * @param {*} path
     * @param {*} queryString
     * @param {*} body
     */
    async callApi({ method, path, query, body, timeout = 5000, }) {
        const url = `${this.apiBaseUrl}${path}`;
        try {
            const response = await this.httpClient({
                url,
                method,
                timeout,
                headers: DEFAULT_HEADERS,
                query,
                body,
            });
            const data = response.data;
            if (data?.status == 'ok' || data?.code == 200) {
                this.logger.debug(`API call success. method=[${method}], url=[${url}]`);
                return data?.data ?? null;
            }
            else {
                this.logger.error(`API return error. method=[${method}], url=[${url}]`, {
                    data,
                });
                return null;
            }
        }
        catch (error) {
            this.logger.error(`API error. method=[${method}], url=[${url}]`, {
                error: error.message,
                stack: error.stack,
            });
            return null;
        }
    }
}
exports.HbApi = HbApi;
//# sourceMappingURL=hbApi.js.map