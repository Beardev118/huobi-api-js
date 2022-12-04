'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const httpAgent = new http_1.default.Agent({
    keepAlive: true,
    keepAliveMsecs: 5000,
});
const httpsAgent = new https_1.default.Agent({
    keepAlive: true,
    keepAliveMsecs: 5000,
});
const axiosHttpClient = axios_1.default.create({
    headers: {
        'content-type': 'application/json;charset=utf-8',
        Accept: 'application/json',
    },
    maxRedirects: 1,
    timeout: 5000,
    httpAgent,
    httpsAgent,
    validateStatus: (status) => {
        return status < 400;
    },
});
const httpClient = async (options) => {
    const decoratedOptions = {
        ...options,
        params: options.query,
        data: options.body,
    };
    return axiosHttpClient(decoratedOptions);
};
exports.httpClient = httpClient;
//# sourceMappingURL=defaultHttpClient.js.map