// import all interfaces
import { IWrite } from './write.repositorie';
import { IRead } from './read.repositorie';

import { model, Schema, Model, Document, Types } from 'mongoose';

// that class only can be extended
export abstract class BaseRepository<T extends Document> implements IWrite<T>, IRead<T> {
    private _model: Model<Document>;

    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: Document[]) => void) {
        this._model.create(item, callback);

    }

    retrieve(callback: (error: any, result: Document[]) => void) {
        this._model.find({}, callback)
    }

    update(_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }


    private toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id)
    }
}