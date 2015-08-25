import Mongo from '../js/Persistence/MongoLibrary.js';
import mongoose from 'mongoose';
import User from '../data/Models/User/UserSchema.es6';
import Hobby from '../data/Models/Hobby/HobbySchema.es6';

import chai from 'chai';
chai.should();

describe('MongoDB CRUD functions', () => {
  before(() => {
    mongoose.connect('mongodb://localhost/test');
  });

  it('should add a user to the ddbb', (done) => {
    done();
  });

  it.only('should get a user from ddbb', (done) => {
    let id = '55dca8247bf10d08166c0af4';

    Mongo.getUserById(id).then((user) => {
      console.log(user);
      user.hobbies.should.be.instanceOf(Array);
      user._id.should.be.equal(user.id);
      done();
    }).catch(done);
  });

  it('should have an id for each user, not _id', (done) => {
    done();
  });

  after(() => {
    mongoose.disconnect();
  });
});