const { gql } = require("apollo-server-express");

const userType = gql`
    type User {
        id: ID!,
        name: String!,
        email: String!,
        createdAt: String!,
        updatedAt: String!
    }
    
   

    type Query {
           users: [User] 
    }

    type Mutation {
        createUser(name: String!,email: String!):User
    }

    type Subscription{
        userCreated: User
    }
`;

module.exports = userType;
