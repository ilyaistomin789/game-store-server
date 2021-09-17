export default interface ICategoryRepository<T> {
  createCategory(category: T): Promise<void>;
  getCategory(): Promise<T[]>;
}
