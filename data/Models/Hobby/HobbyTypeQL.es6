import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import {
  Node
  } from '../NodeInterface.es6';

export default new GraphQLObjectType({
  name: 'Hobby',
  description: 'A hobby',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    description:{
      type: GraphQLString
    }
  }),

  interfaces:[Node]
});
