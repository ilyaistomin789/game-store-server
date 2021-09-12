import { Request, Response } from 'express';
import { IProduct } from '../../db/interfaces/product.interface';
import { ProductRepository } from '../../db/';

const getProductService = async (req: Request, res: Response): Promise<IProduct[] | void> => {
  try {
    const products = await ProductRepository.getProduct();
    if (products !== null) {
      res.send(products);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.send(e && e.message);
  }
};

export default getProductService;
