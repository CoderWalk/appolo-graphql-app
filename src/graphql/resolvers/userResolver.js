const User = require("../../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        registerUser: async (_, { name, email, password }) => {
            const exists = await User.findOne({ email });
            if (exists) {
                throw new Error("Email already registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newuser = new User({ name, email, password: hashedPassword });
            newuser.save();

            const token = jwt.sign({ userId: newuser.id }, process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )
            return { token, user: newuser }
            //const user = new User({ name, email });//new user instace obj is created
            //return await user.save();
        },
        loginUser: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new Error("incorrect credentials")
            }


            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            return { token, user }
        },
    },
}

module.exports = userResolver;
