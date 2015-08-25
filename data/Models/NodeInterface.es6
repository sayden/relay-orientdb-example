import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  } from 'graphql-relay';

import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
  } from 'graphql';

import {
  UserQueries,
  UserMutations,
  UserType
  } from './User/UserQL.es6';

import {
  HobbyType,
  HobbyQueries,
  HobbyMutations,
  } from './Hobby/HobbyQL.es6';

import User from './User/UserSchema.es6';
import Hobby from './Hobby/HobbySchema.es6';

/*
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return new Promise((reject, resolve) => {
        User.findById(id).populate('hobbies friends').exec((err, res) =>{
          err ? reject(err) : resolve(res);
        });
      });
    } else if (type === 'Hobby') {
      return new Promise((resolve, reject) => {
        //Hobby is a Mongoose schema
        Hobby.findById(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    } else {
      return Promise.reject(new Error('Type not found'));
    }
  },
  (obj) => {
    return obj.age ? UserType : HobbyType;
  }
);
*/

var Node = new GraphQLInterfaceType({
  name:'Node',
  description:'An object with an ID',
  fields: () => ({
    _id: {
      type:new GraphQLNonNull(GraphQLID),
      description: 'The global unique ID of an object'
    }
  }),
  possibleTypes:[UserType, HobbyType],
  resolveType:UserType
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
  resolve: (obj, ref) => {
    console.log(obj,ref);
    let id = res.id;

    return new Promise((resolve, reject) => {
      //Hobby is a Mongoose schema
      Hobby.findById(id).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};

exports.nodeInterface = null;
exports.nodeField = nodeField;
exports.Node = Node;