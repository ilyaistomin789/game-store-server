export interface IUserRepository<T> {
  registerUser(user: T): Promise<void>;
  updateUser(user: T): Promise<void>;
  updatePassword(user: T): Promise<void>;
}
