const User = require("../../models/User");
const userResolver = {
    Query: {
        users: async () => {
            return await User.find().sort({ createdAt: -1 });
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            const exists = await User.findOne({ email });
            if (exists) {
                throw new Error("User already exists");
            }
            const user = await User.create({ name, email });
            return user;
            //const user = new User({ name, email });//new user instace obj is created
            //return await user.save();
        },
        updateUser: async (_, { id, name, email }) => {
            const update = {}
            if (name !== undefined) {
                update.name = name
            }
            if (email !== undefined) {
                const exists = await User.findOne({ email });
                if (exists) {
                    throw new Error("User already exists");
                }
                update.email = email
            }
            const result = await User.findByIdAndUpdate(id, update, { new: true })
            return result
        },
        deleteUser: async (_, { id }) => {
            const result = await User.findByIdAndDelete(id);
            return !!result;
        },
    },
}

module.exports = userResolver;
