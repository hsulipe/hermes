import { Request, Response } from 'express';
import CreateService from '../services/Create';
import DeleteService from '../services/Delete';
import ListService from '../services/List';
import ShowService from '../services/Show';
import UpdateService from '../services/Update';

export default class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = new ShowService();
    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateService();
    const product = await createProduct.execute({
      name,
      price,
      quantity
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, price, quantity } = req.body;

    const updateProduct = new UpdateService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = new DeleteService();
    await deleteProduct.execute({ id });

    return res.json({}  );
  }
}
