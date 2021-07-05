import Product from '../typerorm/entities/Product';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';

interface IShowProductRequest {
    id: string,
}

class ShowService {
  public async execute({ id }: IShowProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    return product;
  }
}

export default ShowService;
