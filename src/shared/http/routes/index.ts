import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/Products.routes';

const routes = Router();

routes.use(productsRouter);
routes.get('/', (req, res) => res.json({ message: " Hello I'm  Hermes!" }));

export default routes;
