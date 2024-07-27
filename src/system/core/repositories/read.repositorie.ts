import { model, Schema, Model, Document, Types } from 'mongoose';

/**
 * Base repository interface.
 */
export interface IRead<T> {
    find(filter: any, callback: (error: any, result: Document[]) => void): Promise<T[]>;
    findOne(id: string, callback: (error: any, result: T) => void): Promise<T>;
}