// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
  } from 'graphql';

import UserQueries from './Models/User/UserQueriesQL.es6';
import UserType from './Models/User/UserTypeQL.es6';
import UserMutations from './Models/User/UserMutationsQL.es6';
import User from './Models/User/UserSchema.es6';

import HobbyQueries from './Models/Hobby/HobbyQueriesQL.es6';
import HobbyType from './Models/Hobby/HobbyTypeQL.es6';
import HobbyMutations from './Models/Hobby/HobbyMutationsQL.es6';
import Hobby from './Models/Hobby/HobbySchema.es6';


import nodeField from './Models/NodeInterface.es6';

let RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object

  fields: () => ({
    user: UserQueries.user,
    users: UserQueries.users,
    node: nodeField
  })
});


let RootMutation = new GraphQLObjectType({
  name: "RootMutation",

  fields: () => ({
    addUser: UserMutations.addUser,
    updateUser: UserMutations.updateUser
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;
