import 'dotenv/config';
import config from './Commons/config.js';
import container from './Infrastructures/container.js';
import createServer from './Infrastructures/http/createServer.js';

const start = async () => {
  const app = await createServer(container);
  const { host, port } = config.app;

  app.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`);
  });
};

start();