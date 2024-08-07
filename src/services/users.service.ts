//import { hash } from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import { HttpException } from '../system/core/exceptions/HttpException';
import { IUser, User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../system/core/utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: IUser = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    //const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData });

    return createUserData;
  }

  public async updateUser(
    userId: string,
    userData: CreateUserDto
  ): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: IUser = await this.users.findOne({
        email: userData.email
      });
      if (findUser && findUser._id != userId)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`
        );
    }

    if (userData.password) {
      //const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData };
    }

    const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, {
      userData
    });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById: IUser = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
