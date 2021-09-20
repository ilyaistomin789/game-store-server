import { IAccountRepository } from '../interfaces/accountRepository.interface';
import { IAccountMongo } from '../interfaces/account.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Account from '../mongo/models/account';
import bcrypt from 'bcrypt';

export default class AccountTypegooseRepository implements IAccountRepository<IAccountMongo> {
  private accountModel = getModelForClass(Account);
  public async registerAccount(account: IAccountMongo): Promise<void> {
    const passwordHash = await bcrypt.hash(account.password, 10);
    await this.accountModel.create({
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
      password: passwordHash,
      role: 'buyer',
    });
  }

  public async updatePassword(username: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.accountModel.findOneAndUpdate(
      { username: username },
      { $set: { password: passwordHash } },
      { new: true }
    );
  }

  public async updateAccount(account: IAccountMongo): Promise<void> {
    await this.accountModel.findOneAndUpdate(
      { username: account.username },
      { $set: { firstName: account.firstName, lastName: account.lastName, username: account.username } },
      { new: true }
    );
  }

  public async getAccountByUsername(username: string): Promise<IAccountMongo> {
    return this.accountModel.findOne({ username });
  }
}
