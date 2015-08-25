import User from './data/Models/User/UserSchema.es6';

import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/test');

User.find({}).toClient().exec((err, res) => {
  console.log(res[0]);
  mongoose.disconnect();
});
