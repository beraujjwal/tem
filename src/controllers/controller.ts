import { IRequest, IResponse, INext } from './../system/core/interfaces/index';

class UsersController {
  async listUsers(req: IRequest, res: IResponse, next: INext) {
    try {
      const users = await usersService.list(100, 0);
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: IRequest, res: IResponse, next: INext) {
    try {
      const user = await usersService.readById(req.body.id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: IRequest, res: IResponse, next: INext) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const userId = await usersService.create(req.body);
      res.status(201).send({ id: userId });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: IRequest, res: IResponse, next: INext) {
    try {
      if (req.body.password) {
        req.body.password = await argon2.hash(req.body.password);
      }
      await usersService.patchById(req.body.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async put(req: IRequest, res: IResponse, next: INext) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      await usersService.putById(req.body.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async removeUser(req: IRequest, res: IResponse, next: INext) {
    try {
      await usersService.deleteById(req.body.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
