import { IRequest, IResponse, INext } from './../system/core/interfaces/index';

import { baseController } from '../system/core/controllers/base.controller';

class Controller extends baseController {

  public service: any

  constructor(service) {    
    super(service);
  }

  
  async getAllItems(req: IRequest, res: IResponse, next: INext) {
    try {
      const users = await this.service.list(100, 0);
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async getItem(req: IRequest, res: IResponse, next: INext) {
    try {
      const user = await this.service.readById(req.body.id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async storeItem(req: IRequest, res: IResponse, next: INext) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const userId = await this.service.create(req.body);
      res.status(201).send({ id: userId });
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: IRequest, res: IResponse, next: INext) {
    try {
      await this.service.patchById(req.body.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req: IRequest, res: IResponse, next: INext) {
    try {
      await this.service.deleteById(req.body.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default { Controller };
