import Product from '../typerorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';


class ListService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return products;
  }
}

export default ListService;
