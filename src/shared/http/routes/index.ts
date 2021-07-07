import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/Products.routes';
import sessionsRouter from '../../../modules/users/routes/Sessions.routes';
import usersRouter from '../../../modules/users/routes/Users.routes';

const routes = Router();

routes.use(productsRouter);
routes.use(usersRouter);
routes.use(sessionsRouter);

routes.get('/', (req, res) => res.json({ message: " Hello I'm  Hermes!" }));

export default routes;
