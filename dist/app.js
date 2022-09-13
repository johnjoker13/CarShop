"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    startServer(PORT = process.env.PORT || 3001) {
        (0, connection_1.default)();
        this.app.listen(PORT, () => console.log(`Server running here 👉 http://localhost:${PORT}`));
    }
    addRouter(router) {
        this.app.use(router);
    }
    getApp() {
        return this.app;
    }
}
exports.default = App;
