'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = {
    info: function (msg, params) {
        console.log(`${new Date().toISOString()} [info]: ${msg}`, this.serializeParams(params));
    },
    debug: function (msg, params) {
        console.debug(`${new Date().toISOString()} [debug]: ${msg}`, this.serializeParams(params));
    },
    error: function (msg, params) {
        console.error(`${new Date().toISOString()} [error]: ${msg}`, this.serializeParams(params));
    },
    serializeParams: function (params) {
        let paramsStr = '';
        if (params !== undefined) {
            try {
                paramsStr = JSON.stringify(params);
            }
            catch (e) {
                paramsStr = '[Cannot serialize params]';
            }
        }
        return paramsStr;
    },
};
exports.logger = logger;
//# sourceMappingURL=defaultLogger.js.map