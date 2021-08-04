import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/Products.routes';
import passwordRouter from '../../../modules/users/routes/Passwords.routes';
import profileRouter from '../../../modules/users/routes/Profile.routes';
import sessionsRouter from '../../../modules/users/routes/Sessions.routes';
import usersRouter from '../../../modules/users/routes/Users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.get('/', (req, res) => res.json({ message: " Hello I'm  Hermes!" }));

export default routes;
