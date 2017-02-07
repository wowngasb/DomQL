"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const graphql_1 = require("graphql");
const cheerio = require("cheerio");
const config_1 = require("../src/config");
const schema_1 = require("../src/schema");
function queryGql(query, mockFetchResponseText) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield graphql_1.graphql(schema_1.default, query, {}, getMockContext(mockFetchResponseText));
    });
}
exports.queryGql = queryGql;
function getMockFetch(mockFetchResponseText) {
    const mockResponse = {
        text: function () {
            return new Promise((resolve) => {
                resolve(mockFetchResponseText);
            });
        }
    };
    return function (url) {
        return new Promise((resolve) => {
            resolve(mockResponse);
        });
    };
}
exports.getMockFetch = getMockFetch;
function getMockContext(mockFetchResponseText) {
    return {
        cheerio,
        config: config_1.default,
        fetch: getMockFetch(mockFetchResponseText)
    };
}
exports.getMockContext = getMockContext;
