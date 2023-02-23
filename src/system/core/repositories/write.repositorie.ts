import { model, Schema, Model, Document, Types } from 'mongoose';
/**
 * Base repository interface.
 */
export interface IRepository<T> {    
  
    /**
     * Insert one item in the collection.
     *
     * @param data Object that you want to store
     */
    create(data: Partial<T>): Promise<T>;
    createMany(data: Partial<T[]>): Promise<T[]>;
  
    update(filter: FilterQuery<T>, data: Partial<T>, multi: boolean): Promise<void>;
    updateById(ids: Types.ObjectId | Types.ObjectId[], data: Partial<T>): Promise<void>;
  
    /**
     * It finds all the matching documents by the given filter and removes them.
     *
     * @param filter FilterQuery
     */
    deleteMany(filter: FilterQuery<T>, multi: boolean): Promise<void>;
  
    /**
     * Remove documents from database by given IDs. This method receives one or more
     * IDs. Checks if the IDs are valid and proceed to delete.
     *
     * @param ids ObjectID | ObjectID[]
     */
    deleteOne(id: Types.ObjectId | Types.ObjectId[]): Promise<void>;
  
    /**
     * Get the collection instance of the repository.
     *
     * @returns MongoDB collection instance
     */
    getCollection(): Collection;
  }