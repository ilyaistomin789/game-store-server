import { Schema } from 'mongoose';

export interface IAccountRepository<T> {
  registerAccount(account: T): Promise<void>;
  updateAccount(accountId: number | Schema.Types.ObjectId, account: T): Promise<void>;
  updatePassword(accountId: number | Schema.Types.ObjectId, newPassword: string): Promise<void>;
  getAccountByUsername(username: string): Promise<T>;
}
