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
      err ? reject(err) : resolve(res);
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


exports.saveNewHobby = (root, {title, description}) => {
  var newHobby = new Hobby({title:title, description:description});

  return new Promise((resolve, reject) => {
    newHobby.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
};

exports.updateHobby = (root, {title, description, id}) => {
  let modify = {};
  title ? modify.title = title : null;
  description ? modify.description = description : null;
  return new Promise((resolve, reject) => {
    Hobby.update({id:id}, modify, (err, res) =>{
      if(err){
        reject(err)
      } else {
        Hobby.findById(id, (err, res) => {
          err ? reject(err): resolve(res);
        });
      }
    });
  });
};