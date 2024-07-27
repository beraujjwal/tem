import { IWrite } from './write.repositorie';
import { IRead } from './read.repositorie';

import mongoose = require("mongoose");

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    async retrieve(filter: any, callback: (error: any, result: mongoose.Document[]) => void) {
        this._model.find(filter, callback)
    }

    async create(item: T, callback: (error: any, result: mongoose.Document[]) => void) {
        this._model.create(item, callback);

    }

    async findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findOne(_id, callback);
    }

    async update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    async delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    // async findOne(_id: string, callback: (error: any, result: T) => void) {
    //     this._model.findById(_id, callback);
    // }


    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}