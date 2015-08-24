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
  users: {
    type: UserType,
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
