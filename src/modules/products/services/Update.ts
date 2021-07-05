import Product from '../typerorm/entities/Product';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';

interface IUpdateProductRequest {
  id: string,
  name: string,
  price: number,
  quantity: number,
}

class UpdateService {
  public async execute({
    id,
    name,
    price,
    quantity
  }: IUpdateProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const productExists = await productRepository.findByName(name);

    if (productExists && product.id !== productExists.id) {
      throw new AppError('Product name in use', 500);
    }

    product.name = name;
    product.price = price
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateService;
