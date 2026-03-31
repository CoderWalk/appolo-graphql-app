const User = require("../../models/User");
const { subscribe } = require('../../pubsub')

const pubsub = require('../../pubsub')

const USER_CREATED = "USER_CREATED";

const userResolver = {
    Query: {
        users: async () => await User.find()
    },
    Mutation: {

        createUser: async (_, { name, email }) => {
            const user = new User({ name, email });
            await user.save();

            await pubsub.publish(USER_CREATED, { userCreated: user })
            return user;
        }
    },

    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterableIterator(USER_CREATED)
        }
    }
}

module.exports = userResolver;
