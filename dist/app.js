"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
class App {
    constructor() {
        this.Start = (port) => {
            return new Promise((resolve, reject) => {
                this.httpServer.listen(port, () => {
                    this.httpServer.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
                    resolve(port);
                })
                    .on('error', (err) => reject(err));
            });
        };
        this.httpServer = express_1.default();
        new router_1.default(this.httpServer);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map