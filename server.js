const Hapi = require("hapi");
const plugins = require("./plugins/index");
const Config = require("./config/appConfig");
const { handleError } = require("./utilities/universal");
const env = require("./env");

module.exports = async () => {
  const server = new Hapi.Server({
    host: Config[env.instance].host,
    port: Config[env.instance].port,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['X-Authorization'],
        additionalExposedHeaders: ['X-Authorization']
      },
      validate: {
        failAction: handleError
      }
    }
  });

  await server.register(plugins);

  try {
    await server.start();
    require("./scheduler")(server);
    
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }
  console.log(`+++ Server running at: ${server.info.uri}`);
};
