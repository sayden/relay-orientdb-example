import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import HobbyType from './HobbyTypeQL.es6';
import Hobby from './HobbySchema.es6';

export default {
  hobby: {
    type: HobbyType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: (root, {id}) => {
      return new Promise((resolve, reject) => {
        //Hobby is a Mongoose schema
        Hobby.findById(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },

  hobbies: {
    type: HobbyType,
    resolve: () => {
      return new Promise((resolve, reject) => {
        Hobby.find({}, (err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
