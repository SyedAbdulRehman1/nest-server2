"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        const responseHTML = `
    <html>
      <head><title>Our Project</title></head>
      <body>
        <h1>Welcome to Our Project</h1>
        <table border="1">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll NO</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Hafiz Syed Abdul Rehman</td>
            <td>BsCS_F20_379</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Shayan Tahir</td>
            <td>BsCS_F20_312</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Huzaifa Hanif</td>
            <td>BsCS_F20_360</td>
          </tr>
        </table>
      </body>
    </html>
  `;
        return responseHTML;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map