require("dotenv").config();
const { createApp, createApolloServer } = require("./app");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./graphql/schema");
const { createServer } = require('http')
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { execute, subscribe } = require("graphql");

const PORT = process.env.PORT || 4000;

(async () => {
    const app = await createApp();

    const httpServer = createServer(app)
    await connectDB();

    await createApolloServer(app);
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });
    SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        onConnect: () => {
            console.log("Client connected");
        },
        onDisconnect: () => {
            console.log("Client disconnected");
        }
    },
        {
            server: httpServer,
            path: '/graphql'
        }
    )

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
