import { Router } from 'express';

const routes = (controller) => {
  const router = Router();

  router.post('/authentications', controller.postAuthentication);
  router.put('/authentications', controller.putAuthentication);
  router.delete('/authentications', controller.deleteAuthentication);

  return router;
}

export default routes;