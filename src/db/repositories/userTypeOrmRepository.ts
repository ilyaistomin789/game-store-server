import { IUserRepository } from '../interfaces/userRepository.interface';
import { IUserPostgres } from '../interfaces/user.interface';
import { getConnection, Repository } from 'typeorm';
import User from '../../entity/user';
import bcrypt from 'bcrypt';

export default class UserTypeOrmRepository implements IUserRepository<IUserPostgres> {
  private userRepository: Repository<IUserPostgres> = getConnection().getRepository(User);
  public async registerUser(user: IUserPostgres): Promise<void> {
    const newUser: IUserPostgres = new User();
    const passwordHash = await bcrypt.hash(user.password, bcrypt.genSalt());
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.username = user.username;
    newUser.password = passwordHash;
    newUser.role = 'buyer';
    await this.userRepository.save(newUser);
  }

  public async updatePassword(user: IUserPostgres): Promise<void> {}

  public async updateUser(user: IUserPostgres): Promise<void> {}
}
