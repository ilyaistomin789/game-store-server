export interface IAccountRepository<T> {
  registerAccount(account: T): Promise<void>;
  updateAccount(account: T): Promise<void>;
  updatePassword(username: string, newPassword: string): Promise<void>;
  getAccountByUsername(username: string): Promise<T>;
}
