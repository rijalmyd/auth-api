import { Router } from 'express';

const routes = (controller) => {
  const router = Router();

  router.post('/users', controller.postUser);

  return router;
};

export default routes;