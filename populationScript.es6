import mongoose from 'mongoose';

import User from './data/Models/User/UserSchema.es6';
import Hobby from './data/Models/Hobby/HobbySchema.es6';

mongoose.connect('mongodb://localhost/test');



let hobbyCycling = new Hobby({
  title:'cycling',
  description:'a painful sport'
});

let hobbyHorses = new Hobby({
  title:'horses',
  description:'to get in one with an animal'
});

let hobbyFlying = new Hobby({
  title:'flying',
  description:'man and machine in one'
});

let hobbySleeping = new Hobby({
  title:'sleeping',
  description:'resting for whole day'
});


let userMario = new User({
  name:"Mario",
  surname:"Castro",
  age:30,
  hobbies:[hobbyCycling, hobbyFlying]
});

let userUla = new User({
  name:"Ula",
  surname:"Kornowska",
  age:26,
  hobbies:[hobbyHorses, hobbySleeping]
});

let userRocco = new User({
  name:"Rocco",
  surname:"Artemisa",
  age:8,
  hobbies:[hobbySleeping]
});

let userOla = new User({
  name:"Ola",
  surname:"SomePolish",
  age:2,
  hobbies:[hobbySleeping, hobbyHorses],
  friends:[userMario, userUla]
});

userUla.friends = [userMario, userOla, userRocco];
userMario.friends = [userUla, userOla, userRocco];
userRocco.friends = [userMario, userUla];

if(false){
  hobbyCycling.save();
  hobbyFlying.save();
  hobbyHorses.save();
  hobbySleeping.save();

  userMario.save();
  userUla.save();
  userRocco.save();
  userOla.save();
}

User.update({_id:"55da2995e7f5581b3698f410"}, {age:26}, (err, res) => {
  console.log(err, res);
});