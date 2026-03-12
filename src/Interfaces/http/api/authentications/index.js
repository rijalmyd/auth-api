import AuthenticationsController from './controller.js';
import routes from './routes.js';

const authentications = (container) => {
  const controller = new AuthenticationsController(container);
  return routes(controller);
};

export default authentications;