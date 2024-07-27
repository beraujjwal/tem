import { model, Schema, Model, Document, Types } from 'mongoose';
/**
 * Base repository interface.
 */
export interface IWrite<T> {
  create(item: T, callback: (error: any, result: Document[]) => void): Promise<boolean>;
  update(id: string, item: T, callback: (error: any, result: any) => void): Promise<boolean>;
  delete(id: string, callback: (error: any, result: any) => void): Promise<boolean>;
}