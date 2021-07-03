import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: " Hello I'm  Hermes!" }));

export default routes;
