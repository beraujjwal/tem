import { model, Schema, Model, Document, Types } from 'mongoose';
/**
 * Fields you want to select. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 0 (exclude) or 1 (include).
 * Example: { username: 1, email: 1 } (Select only username and email)
 */
export interface Select {
    [key: string]: 1 | 0;
}

/**
 * Fields you want to order by. For mongodb it is a key-value pair.
 * Key is the name of the field and Value is 1 (ascending) or -1 (descending).
 * Example: { username: 1 } (Sort result by username in ascending order)
 */
export interface Sort {
    [key: string]: 1 | -1;
}
  

/**
 * Base repository interface.
 */
export interface IRepository<T> {
    /**
     * Receives an ID and fetch data from database by that ID.
     *
     * @param id Id of the document
     * @param select Field to project properties. This is optional.
     */
    get(id: Types.ObjectId, select?: Select): Promise<T>;
  
    /**
     * Get documents from collection.
     *
     * @param filter Filter query
     * @param limit Documetn limit per page
     * @param page Current page number
     * @param [select] Fields to select
     * @param [sort] Sort order
     *
     * @returns Array of documents
     */
    find(filter: FilterQuery<T>, limit: number, page?: number, select?: Select, sort?: Sort): Promise<T[]>;
  
    /**
     * Get the collection instance of the repository.
     *
     * @returns MongoDB collection instance
     */
    getCollection(): Collection;
  }