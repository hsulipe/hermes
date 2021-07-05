import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';

interface IDeleteProductRequest {
  id: string,
}

class DeleteService {
  public async execute({
    id,
  }: IDeleteProductRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    await productRepository.remove(product);
  }
}

export default DeleteService;
