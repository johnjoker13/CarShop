"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomModel {
    model;
    constructor(model) {
        this.model = model;
    }
    create = async (obj) => this.model.create({ ...obj });
    read = async () => this.model.find();
    readOne = async (id) => this.model.findOne({ _id: id });
    update = async (id, obj) => this.model.findOneAndUpdate({ _id: id }, obj, { returnOriginal: false });
    delete = async (id) => this.model.findByIdAndDelete({ _id: id });
}
exports.default = CustomModel;
