const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./graphql/schema");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");

async function createApp() {
    const app = express();

    app.use(cors());


    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true, // Sandbox ko schema dikhane ke liye zaroori hai
        csrfPrevention: false, // Local development mein sandbox block hone se rokne ke liye
        context: ({ req }) => {
            const user = authMiddleware(req);
            return { user }
        }
    });

    await server.start();

    server.applyMiddleware({ app, path: "/graphql" });

    return app;
}

module.exports = createApp;

