import User from '../../data/Models/User/UserSchema.es6';
import Hobby from '../../data/Models/Hobby/HobbySchema.es6';

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id).populate('hobbies friends')
      .exec((err, res) => {
        err ? reject(err) : resolve(res);
    });
  });
};
