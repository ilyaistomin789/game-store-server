import { IAccountRepository } from '../interfaces/accountRepository.interface';
import { IAccountPostgres } from '../interfaces/account.interface';
import { getConnection, Repository } from 'typeorm';
import Account from '../postgres/entity/account';
import bcrypt from 'bcrypt';

export default class AccountTypeOrmRepository implements IAccountRepository<IAccountPostgres> {
  private accountRepository: Repository<IAccountPostgres> = getConnection('default').getRepository(Account);
  public async registerAccount(account: IAccountPostgres): Promise<void> {
    const newUser: IAccountPostgres = new Account();
    const passwordHash = await bcrypt.hash(account.password, 10);
    newUser.firstName = account.firstName;
    newUser.lastName = account.lastName;
    newUser.username = account.username;
    newUser.password = passwordHash;
    newUser.role = 'buyer';
    await this.accountRepository.save(newUser);
  }

  public async updatePassword(accountId: number, newPassword: string): Promise<void> {
    const userToUpdate: IAccountPostgres = await this.accountRepository.findOne(accountId);
    userToUpdate.password = await bcrypt.hash(newPassword, 10);
    await this.accountRepository.save(userToUpdate);
  }

  public async updateAccount(accountId: number, account: IAccountPostgres): Promise<void> {
    const userToUpdate: IAccountPostgres = await this.accountRepository.findOne(accountId);
    userToUpdate.firstName = account.firstName;
    userToUpdate.lastName = account.lastName;
    await this.accountRepository.save(userToUpdate);
  }

  public async getAccountByUsername(username: string): Promise<IAccountPostgres> {
    return this.accountRepository.findOne({ username });
  }
}
