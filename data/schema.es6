// schema.js
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
  } from 'graphql';

import {
  UserQueries,
  UserMutations,
  UserType
  } from './Models/User/UserQL.es6';

import {
  HobbyType,
  HobbyQueries,
  HobbyMutations,
  } from './Models/Hobby/HobbyQL.es6';


let RootQuery = new GraphQLObjectType({
  name: 'RootQuery',      //Return this type of object
  fields: () => ({
    user: UserQueries.user,
    users: UserQueries.users,
    hobby: HobbyQueries.hobby,
    hobbies: HobbyQueries.hobbies
  })
});


let RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: () => ({
    addUser: UserMutations.addUser,
    addHobby: HobbyMutations.addHobby,
    updateUser: UserMutations.updateUser
  })
});


let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

export default schema;
