"use strict";
// src/routes/Router.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CustomRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
    }
    addRoute(controller, route = controller.route) {
        this.router.get(route, controller.read);
        this.router
            .route(`${route}/:id`)
            .get(controller.readOne)
            .put(controller.update)
            .delete(controller.delete);
        this.router.post(route, controller.create);
    }
}
exports.default = CustomRouter;
