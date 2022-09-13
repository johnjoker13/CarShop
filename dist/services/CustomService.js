"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomService {
    model;
    constructor(model) {
        this.model = model;
    }
    create = async (obj) => this.model.create(obj);
    read = async () => this.model.read();
    readOne = async (id) => this.model.readOne(id);
    async update(id, obj) {
        return this.model.update(id, obj);
    }
    delete = async (id) => this.model.delete(id);
}
exports.default = CustomService;
