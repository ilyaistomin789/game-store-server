import { Request, Response } from 'express';

export default interface IProductRepository<T> {
  create(req: Request, res: Response): void;
  read(req: Request, res: Response): T;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}
