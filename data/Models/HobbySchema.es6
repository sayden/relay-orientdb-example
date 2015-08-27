import mongoose from 'mongoose';

var HobbySchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  title: String,
  description: String,
  type: String
});

let Hobby = mongoose.model('Hobby', HobbySchema);

module.exports = Hobby;

module.exports.getHobbyById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Hobby.findById(id).exec((err, res) => {
      if (res == null) {
        Hobby.findById(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      } else {
        reject(new Error(`Search result for id ${id} was null`));
      }
    })
  });
};

module.exports.getListOfHobbies = () => {
  return new Promise((resolve, reject) => {
    Hobby.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};