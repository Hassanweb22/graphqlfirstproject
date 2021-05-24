const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    childs: [SingleChild!]!
    SingleChild (name: String!): SingleChild!
    parents: [SingleParent!]!
    SingleParent (id: ID!): SingleParent!
  }

  type SingleChild {
    id: ID!
    name: String!
    fname: String!
    age: Int!
    parents: SingleParent!
    siblings: [SingleChild]
  }

  type SingleParent {
    id: ID!
    fatherName: String!
    occupation: String!
    childs: [SingleChild]
  }

  type Mutation {
      createParent(fatherName: String!, occupation:String!): SingleParent!
      createChild (name: String!, fname:String!, age: Int!): SingleChild!
      updateChild (name: String!, fname:String, age: Int): SingleChild!
      deleteChild (name: String!): SingleChild!
  }

  type Subscription {
    createParent (fatherName: String!, occupation:String!): SingleParent!
    createChild (name: String!, fname:String!, age: Int!): SingleChild!
  }
`;

module.exports = typeDefs