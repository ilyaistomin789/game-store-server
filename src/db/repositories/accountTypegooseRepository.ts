import { IAccountRepository } from '../interfaces/accountRepository.interface';
import { IAccountMongo } from '../interfaces/account.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Account from '../mongo/models/account';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

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

  public async updatePassword(accountId: Schema.Types.ObjectId, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.accountModel.findOneAndUpdate({ _id: accountId }, { $set: { password: passwordHash } }, { new: true });
  }

  public async updateAccount(accountId: Schema.Types.ObjectId, account: IAccountMongo): Promise<void> {
    await this.accountModel.findOneAndUpdate(
      { _id: accountId },
      { $set: { firstName: account.firstName, lastName: account.lastName } },
      { new: true }
    );
  }

  public async getAccountByUsername(username: string): Promise<IAccountMongo> {
    return this.accountModel.findOne({ username });
  }
}
