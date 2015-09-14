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

    renameRids: object => {
      return renameRids(object);
    }
  }
})();

function parseRidResponse (ridResponse) {
  return "#" + ridResponse.cluster + ":" + ridResponse.position;
}

/**
 * Rename every @rid field in the response to RID
 * @param object
 * @returns {*}
 */
function renameRids (object) {
  if (object instanceof Array) {
    for (let i = 0; i < object.length; i++) {
      parsePlainJson(object[i]);
    }
  } else {
    parsePlainJson(object);
  }
  function parsePlainJson(json) {
    Object.keys(json).forEach(key => {
      if (key == "@rid") {
        json.id = parseRidResponse(json[key]);
        delete json[key];
      } else if (json[key] instanceof Array) {
        renameRids(json[key]);
      }
    })
  }

  return object;
}

export default Singleton;