import OrientDbSingleton from '../OrientDbSingleton.es6';

let db = OrientDbSingleton.getInstance();

//import Hobby from './HobbySchema.es6';

exports.UserSchema = null; //FIXME

function renameRids(object){
  if(object )
}

exports.getUserById = (root, {id}) => {
  let query = db.select('name, surname, age, type, out("Likes") as likes, out("Follows") as friends')
          .from('User')
          .where({"@rid":id})
          .fetch({likes:0, friends:0})
          .transform(record => {
            record.id = OrientDbSingleton.parseRidResponse(record["@rid"]);
            return record;
          })
          .one();

  return new Promise((resolve, reject) => {
    query.then(res => {
      console.log(res);
      resolve(res);
    })
  })
};

exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.getListOfUsers = () => {
  return db.select().from("User").all();
};

exports.addUser = (root, {name, surname, age, hobbies, friends}) => {
  var newUser = new User({
    name: name,
    surname: surname,
    age: age,
    hobbies: hobbies,
    friends: friends
  });

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.updateUser = (root, {name, surname, age ,hobbies, friends, id}) => {
  let modify = {};

  name ? modify.name = name : null;
  surname ? modify.surname = surname : null;
  age ? modify.age = age : null;
  hobbies ? modify.hobbies = hobbies : null;
  friends ? modify.friends = friends : null;

  return new Promise((resolve, reject) => {
    User.update({id: id}, modify, (err, res) => {
      User.find({id: id}, (err, res) => {
        err || res.length != 1 ? reject(err) : resolve(res[0]);
      });
    });
  });
};