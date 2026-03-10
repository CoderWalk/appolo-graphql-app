const { gql } = require("apollo-server-express");

const userType = gql`
    type User {
        id: ID!,
        name: String!,
        email: String!,
        createdAt: String!,
        updatedAt: String!
    }
    
    type AuthPayload{
        token: String!,
        user: User!
    }

    type Query {
        users: [User],
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User,
        updateUser(id: ID!, name: String!, email: String!): User,
        deleteUser(id: ID!): Boolean
        registerUser(name: String!, email: String!,password: String!): AuthPayload,
        loginUser(email: String!,password: String!): AuthPayload
    }
`;

module.exports = userType;
