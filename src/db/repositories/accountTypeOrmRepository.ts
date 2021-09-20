import { IAccountRepository } from '../interfaces/accountRepository.interface';
import { IAccountPostgres } from '../interfaces/account.interface';
import { getConnection, Repository } from 'typeorm';
import Account from '../../entity/account';
import bcrypt from 'bcrypt';

export default class AccountTypeOrmRepository implements IAccountRepository<IAccountPostgres> {
  private userRepository: Repository<IAccountPostgres> = getConnection().getRepository(Account);
  public async registerAccount(account: IAccountPostgres): Promise<void> {
    const newUser: IAccountPostgres = new Account();
    const passwordHash = await bcrypt.hash(account.password, bcrypt.genSalt());
    newUser.firstName = account.firstName;
    newUser.lastName = account.lastName;
    newUser.username = account.username;
    newUser.password = passwordHash;
    newUser.role = 'buyer';
    await this.userRepository.save(newUser);
  }

  public async updatePassword(account: IAccountPostgres): Promise<void> {
    const userToUpdate: IAccountPostgres = await this.userRepository.findOne(account.id);
    userToUpdate.password = await bcrypt.hash(account.password, bcrypt.genSalt());
    await this.userRepository.save(userToUpdate);
  }

  public async updateAccount(account: IAccountPostgres): Promise<void> {
    const userToUpdate: IAccountPostgres = await this.userRepository.findOne(account.id);
    userToUpdate.username = account.username;
    userToUpdate.firstName = account.firstName;
    userToUpdate.lastName = account.lastName;
    await this.userRepository.save(userToUpdate);
  }
}
