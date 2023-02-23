import { IRequest, IResponse, INext } from './interfaces/index';

export interface index {
  /**
   * Base Controller Layer
   * @author Ujjwal Bera
   * @param null
   */

  getAll(req: IRequest, res: IResponse, next: INext): any
  get(req: IRequest, res: IResponse, next: INext): any
  insert(req: IRequest, res: IResponse, next: INext): any
  update(req: IRequest, res: IResponse, next: INext): any
  delete(req: IRequest, res: IResponse, next: INext): any
}