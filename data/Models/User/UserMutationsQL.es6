import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import UserType from './UserTypeQL.es6';
import User from './UserSchema.es6';

export default {
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
        User.update({_id:id}, modify, (err, res) =>{
          User.findOne({_id:id}, (err, res) => {
            err ? reject(err): resolve(res);
          });
        });
      });
    },
    resolveType:UserType
  }
};
