import User from './Models/UserSchema.es6';
import Hobby from './Models/HobbySchema.es6';

// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt
  } from 'graphql';

import {
  connectionArgs,
  connectionDefinitions
  } from 'graphql-relay';


let Node = new GraphQLInterfaceType({
  name:'Node',
  description:'An object with an ID',
  fields: () => ({
    id: {
      type:new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    },
    type: {
      type: GraphQLString,
      description: "The type of the object"
    }
  }),
  resolveType: (obj) => {
    if(obj.type === 'user'){
      return UserType;
    } else if(obj.type === 'hobby') {
      return HobbyType;
    }
  }
});

let HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'A hobby',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description:{
      type: GraphQLString
    },
    type:{
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces:[Node]
});

let {connectionType: hobbyConnection} =
  connectionDefinitions({name: 'Hobby', nodeType: HobbyType});

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    surname:{
      type: GraphQLString
    },
    age:{
      type: GraphQLInt
    },
    hobbies:{
      type: new GraphQLList(HobbyType),
      description: 'The ships used by the faction.'
    },
    type:{
      type: new GraphQLNonNull(GraphQLString)
    }
  }),

  interfaces:[Node]
});

let nodeField =  {
  name:'Node',
  type:Node,
  description:'A node interface field',
  args:{
    id:{
      type:new GraphQLNonNull(GraphQLID),
      description:'Id of node interface'
    }
  },
  resolve: (obj, {id}) => {
    return new Promise((resolve, reject) => {
        User.findById(id).exec((err, res) => {
          if (res == null){
            Hobby.findById(id).exec((err, res) => {
              err ? reject(err) : resolve(res);
            });
          } else {
            err ? reject(err) : resolve(res);
          }
        });
    });
  }
};

let UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    name: 'users',
    description: 'A user list',
    resolve: () => {
      return new Promise((resolve, reject) => {
        User.find({}).populate('hobbies friends').exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
        //User is a Mongoose schema
        User.findById(id).populate('hobbies friends').exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};

let HobbyQueries = {
  hobby: {
    type: HobbyType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      console.log('Running hobby query');
      return new Promise((resolve, reject) => {
        //Hobby is a Mongoose schema
        Hobby.findById(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },

  hobbies: {
    type: new GraphQLList(HobbyType),
    resolve: () => {
      console.log('Running hobbies query');
      return new Promise((resolve, reject) => {
        Hobby.find({}).exec((err, res) => {
          res = res;
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};

let UserMutations = {
  addUser:{
    type:UserType,
    args: {
      name:{
        name:'name',
        type:new GraphQLNonNull(GraphQLString)
      },
      surname:{
        name:'surname',
        type: new GraphQLNonNull(GraphQLString)
      },
      age:{
        name:'age',
        type: GraphQLInt
      }
    },
    resolve: (root, {name, surname, age}) => {
      var newUser = new User({name:name, surname:surname, age:age});

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    },
    resolveType:UserType
  },
  updateUser:{
    type:UserType,
    args: {
      id:{
        name:'id',
        type:GraphQLID
      },
      name:{
        name:'name',
        type:GraphQLString
      },
      surname:{
        name:'surname',
        type: GraphQLString
      },
      age:{
        name:'age',
        type: GraphQLInt
      }
    },
    resolve: (root, {name, surname, age, id}) => {
      let modify = {};
      name ? modify.name = name : null;
      surname ? modify.surname = surname : null;
      age ? modify.age = age : null;
      return new Promise((resolve, reject) => {
        User.update({id:id}, modify, (err, res) =>{
          User.findOne({id:id}, (err, res) => {
            err ? reject(err): resolve(res);
          });
        });
      });
    },
    resolveType:UserType
  }
};

let HobbyMutations = {
  addHobby:{
    type:HobbyType,
    args: {
      title:{
        name:'title',
        type:new GraphQLNonNull(GraphQLString)
      },
      description:{
        name:'description',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, {title, description}) => {
      var newHobby = new Hobby({title:title, description:description});

      return new Promise((resolve, reject) => {
        newHobby.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    },
    resolveType:HobbyType
  }
};

let RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object

  fields: () => ({
    user: UserQueries.user,
    users: UserQueries.users,
    hobby: HobbyQueries.hobby,
    hobbies: HobbyQueries.hobbies,
    node: nodeField
  })
});


let RootMutation = new GraphQLObjectType({
  name: "RootMutation",

  fields: () => ({
    addUser: UserMutations.addUser,
    updateUser: UserMutations.updateUser,
    addHobby: HobbyMutations.addHobby
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;