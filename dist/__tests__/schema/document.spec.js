"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const testUtils_1 = require("../testUtils");
describe('Document Type', () => {
    it('can get title from webpage', () => __awaiter(this, void 0, void 0, function* () {
        const query = `
      {
        page(url:"http://www.sanook.com") {
          title
        }
      }
    `;
        const mockHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mock Title</title>
        </head>
      </html>
    `;
        const result = yield testUtils_1.queryGql(query, mockHtml);
        expect(result.data.page.title).toBe('Mock Title');
    }));
});
