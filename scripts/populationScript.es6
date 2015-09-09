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
  friends: [userDonald, userLinus]
};

userDonald.friends = [userRichard, userTim, userLinus];
userRichard.friends = [userDonald, userTim, userLinus];
userLinus.friends = [userRichard, userDonald];

function createVerticesAndEdges (){
  let UserVertexPromise = db.class.create('User', 'V')
    .then( User => {
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
    .then( User => {
      return User.property.create({
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

  return Promise.all(UserVertexPromise, HobbyVertexPromise,
    LikesEdgePromise, FollowsEdgePromise);
}

createVerticesAndEdges().then(res => {
  createUsers([userRichard, userDonald, userLinus, userTim, userMark]);
});

function createUsers(usersArray) {
  let usersPromises = usersArray.map(user => {
    return db.create('VERTEX', 'User').set({
      name:user.name,
      surname:user.surname,
      age:user.age,
      type:user.type
    });
  });

  usersPromises.then(userVertices => {
    userVertices.map(userVertex => {
      let user = usersArray.filter(user => user.name == userVertex.name);
      user.hobbies.map(hobby => {
        db.create('EDGE', 'Hobby'); //TODO
      });

      user.friends.map(hobby => {
        db.create('EDGE', 'Follows').then(res => { //TODO
          console.log(res);
        });
      });
    });
  })
}