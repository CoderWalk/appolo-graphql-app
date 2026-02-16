const { gql } = require("apollo-server-express");

const userType = gql`
    type User {
        name: String!
    }

    type Query {
        getUser: User
    }

    type Mutation {
        createUser(name: String!): User
    }
`;

module.exports = userType;
