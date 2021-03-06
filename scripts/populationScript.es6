import OrientDB from 'orientjs';

let db;
let dbName = "jsTest";

let server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: '1234'
});

/* HOBBIES */
let hobbyCycling = {
  title: 'cycling',
  description: 'a painful sport',
  type: "hobby"
};

let hobbyHorses = {
  title: 'horses',
  description: 'to get in one with an animal',
  type: "hobby"
};

let hobbyFlying = {
  title: 'flying',
  description: 'man and machine in one',
  type: "hobby"
};

let hobbySleeping = {
  title: 'sleeping',
  description: 'resting for whole day',
  type: "hobby"
};

/* USERS */
let userRichard = {
  name: "Richard",
  surname: "Stallman",
  age: 62,
  hobbies: [hobbyCycling, hobbyFlying],
  type: "user"
};

let userDonald = {
  name: "Donald",
  surname: "Knuth",
  age: 77,
  hobbies: [hobbyHorses, hobbySleeping],
  type: "user"
};

let userLinus = {
  name: "Linux",
  surname: "Torvalds",
  age: 45,
  hobbies: [hobbySleeping],
  type: "user"
};

let userTim = {
  name: "Tim",
  surname: "Berners-Lee",
  age: 60,
  hobbies: [hobbySleeping, hobbyHorses],
  friends: [userRichard, userDonald],
  type: "user"
};

let userMark = {
  name: "Mark",
  surname: "Zuckerberg",
  age: 31,
  hobbies: [hobbyCycling, hobbyFlying],
  friends: [userDonald, userLinus],
  type:"user"
};

userDonald.friends = [userRichard, userTim, userLinus];
userRichard.friends = [userDonald, userTim, userLinus];
userLinus.friends = [userRichard, userDonald];

let usersArray = [userDonald, userLinus, userMark, userRichard, userTim];
let hobbiesArray = [hobbyCycling, hobbyFlying, hobbyHorses, hobbySleeping];


function createVerticesAndEdgesClasses (){
  let UserVertexPromise = db.class.create('User', 'V')
    .then( User => {
      console.log('Class User created');
      return User.property.create({
        name: 'name',
        type: 'string'
      },{
          name: 'surname',
          type:'string'
        },{
          name:'age',
          type:'int'
        },{
          name:'type',
          type:'string'
        }
      );
  });

  let HobbyVertexPromise = db.class.create('Hobby', 'V')
    .then( Hobby => {
      console.log('Class Hobby created');
      return Hobby.property.create({
          name: 'title',
          type: 'string'
        },{
          name: 'description',
          type:'string'
        },{
          name:'type',
          type:'string'
        }
      );
    });

  let LikesEdgePromise = db.class.create('Likes', 'E');
  let FollowsEdgePromise = db.class.create('Follows', 'E');

  return Promise.all([UserVertexPromise, HobbyVertexPromise,
    LikesEdgePromise, FollowsEdgePromise]);
}

function getVertexRid (where) {
  return db
    .select('@rid')
    .from('V')
    .where(where)
    .column('rid')
    .one();
}

function makeEdge (fromV, edge, toV) {
  let fromRid;
  let toRid;

  return getVertexRid(fromV)
      .then(rid => {
        fromRid = parseRidResponse(rid);
        return getVertexRid(toV);

    }).then(rid => {
        toRid = parseRidResponse(rid);
        console.log(`Creating an edge: ${fromRid} ${edge} ${toRid}` );

        return db.create('EDGE', edge)
          .from(fromRid)
          .to(toRid)
          .one();
    });
}

function createEdges(usersArray){
  console.log('Creating edges');
  let promises = [];

  usersArray.map(user => {
    let hobbies = user.hobbies.map(hobby => {
      return makeEdge({name:user.name}, 'Likes', {title:hobby.title});
    });

    let friends = user.friends.map(friend => {
      return makeEdge({name:user.name}, 'Follows', {name:friend.name});
    });

    promises = promises.concat(hobbies);
    promises = promises.concat(friends);
  });

  return Promise.all(promises);
}

function createHobbies(hobbiesArray){
  let hobbiesPromises = hobbiesArray.map(hobby => {
    return db.create('VERTEX', 'Hobby').set({
      title:hobby.title,
      description:hobby.description,
      type:hobby.type
    }).one();
  });

  return Promise.all(hobbiesPromises);
}

function createUsers(usersArray) {
  console.log('Going to create ' + usersArray.length + ' vertices');

  let usersPromises = usersArray.map(user => {
    return db.create('VERTEX', 'User')
      .set({
        name:user.name,
        surname:user.surname,
        age:user.age,
        type:user.type
    }).one();
  });

  return Promise.all(usersPromises);
}

function parseRidResponse (ridResponse){
  return "#" + ridResponse.cluster + ":" + ridResponse.position;
}


server.exist(dbName)
  .then(exists => {
    if (exists) {
      return server.drop(dbName);
    } else {
      return Promise.resolve(true);
    }

}).then(res => {
    return server.create({
      name: dbName,
      type: 'graph',
      storage: 'plocal'
    });

}).then(_db => {
  db = _db;
  console.log('database created or connection established');
  return createVerticesAndEdgesClasses();

}).then(res => {
    return createUsers(usersArray);

  }).then(_userVertices => {
    return createHobbies(hobbiesArray);

  }).then(userHobbies => {
    return createEdges(usersArray);

}).then(closeConnection)
  .catch(console.log);

function closeConnection(){
  console.log('edges created. script finished');
  db.close();
  server.close();
}