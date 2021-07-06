import Product from '../typerorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';
import NotFoundError from '../../../shared/errors/NotFoundError';

interface IShowProductRequest {
    id: string,
}

class ShowService {
  public async execute({ id }: IShowProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    return product;
  }
}

export default ShowService;
