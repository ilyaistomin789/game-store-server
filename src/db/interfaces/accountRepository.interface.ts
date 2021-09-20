export interface IAccountRepository<T> {
  registerAccount(account: T): Promise<void>;
  updateAccount(account: T): Promise<void>;
  updatePassword(account: T): Promise<void>;
}
