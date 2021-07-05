import AppError from '../../../shared/errors/AppError';
import Product from '../typerorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typerorm/repositories/ProductRepository';


interface ICreateProductRequest {
  name: string,
  price: number,
  quantity: number,
}

class CreateService {
  public async execute({
    name,
    price,
    quantity
  }: ICreateProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product already exists', 500);
    }

    const product = await productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);
    return product;
  }
}

export default CreateService;
