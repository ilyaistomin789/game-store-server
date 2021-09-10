export default interface IProductRepository<T> {
  createProduct(product: T): Promise<void>;
  getProduct(): Promise<T[]>;
}
