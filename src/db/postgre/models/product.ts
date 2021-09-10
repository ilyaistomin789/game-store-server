import { IProductPostgres } from '../../interfaces/product.interface';
import { Optional } from 'sequelize';

export default class Product implements IProductPostgres {} // TODO make postgre model

interface ProductCreationAttributes extends Optional<IProductPostgres, 'id'> {}
