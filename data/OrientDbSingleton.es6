import OrientDB from 'orientjs';

let Singleton = (() => {
  let dbName = "jsTest";

  let server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '1234'
  });

  let instance;

  function createInstance() {
    instance = server.use(dbName);
    return instance;
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    closeConnection: () => {
      instance.close();
      server.close();
    },

    parseRidResponse: ridResponse => {
    return "#" + ridResponse.cluster + ":" + ridResponse.position;
  }
  };
})();

export default Singleton;