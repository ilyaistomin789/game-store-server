import { IAccountRepository } from '../interfaces/accountRepository.interface';
import { IAccountMongo } from '../interfaces/account.interface';
import { getModelForClass } from '@typegoose/typegoose';
import Account from '../mongo/models/account';
import bcrypt from 'bcrypt';

export default class AccountTypegooseRepository implements IAccountRepository<IAccountMongo> {
  private userModel = getModelForClass(Account);
  public async registerAccount(account: IAccountMongo): Promise<void> {
    const passwordHash = await bcrypt.hash(account.password, bcrypt.genSalt());
    await this.userModel.create({
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
      password: passwordHash,
      role: 'buyer',
    });
  }

  public async updatePassword(account: IAccountMongo): Promise<void> {
    await this.userModel.findByIdAndUpdate(account._id, { $set: { password: account.password } }, { new: true });
  }

  public async updateAccount(account: IAccountMongo): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      account._id,
      { $set: { firstName: account.firstName, lastName: account.lastName, username: account.username } },
      { new: true }
    );
  }
}
