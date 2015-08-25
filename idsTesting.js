import User from './data/Models/User/UserSchema.es6';

import mongoose from 'mongoose';
import Mongo from './js/Persistence/MongoLibrary.js';

mongoose.connect('mongodb://localhost/test');

let id = '55dc9f6b8fe5e2ec0e2712f2';

User.findById(id).exec((err, res) => {
  console.log(res);

  Mongo.getUserById(id).then((user) => {
    console.log(user);
    mongoose.disconnect();
  });
});