import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
  } from 'graphql';

let Node = new GraphQLInterfaceType({
  name:'Node',
  description:'A node',
  fields: function fields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the object.'
      }
    };
  }
});

export default Node;
