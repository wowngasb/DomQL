"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    server: {
        port: process.env.PORT || 3003
    },
    cheerio: {
        decodeEntities: true
    },
    validateUrl: {
        protocols: ['http', 'https'],
        require_protocol: true
    }
};
