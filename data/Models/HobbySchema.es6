import OrientDbSingleton from '../OrientDbSingleton.es6';

let db = OrientDbSingleton.getInstance();

exports.HobbySchema = null; //FIXME

exports.getHobbyById = (root, {id}) => {
  return db.record.get(id);
};

exports.getListOfHobbies = () => {
  return db.select().from("Hobby").all();
};


exports.addHobby = (obj, {title, description}) => {
  var newHobby = new Hobby({title: title, description: description});

  return new Promise((resolve, reject) => {
    newHobby.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateHobby = (root, {title, description, id}) => {
  let modify = {};
  title ? modify.title = title : null;
  description ? modify.description = description : null;

  return new Promise((resolve, reject) => {
    Hobby.update({id: id}, modify, (err, res) => {
      if (err) {
        reject(err)
      } else {
        Hobby.find({id: id}, (err, res) => {
          err || res.length != 1 ? reject(err) : resolve(res[0]);
        });
      }
    });
  });
};