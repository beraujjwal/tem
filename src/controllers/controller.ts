import { IRequest, IResponse, INext } from './../system/core/interfaces/index';

class UsersController {
    async listUsers( req: IRequest, res: IResponse, next: INext ) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById( req: IRequest, res: IResponse, next: INext ) {
        const user = await usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    async createUser( req: IRequest, res: IResponse, next: INext ) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async patch( req: IRequest, res: IResponse, next: INext ) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put( req: IRequest, res: IResponse, next: INext ) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser( req: IRequest, res: IResponse, next: INext ) {
        log(await usersService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new UsersController();