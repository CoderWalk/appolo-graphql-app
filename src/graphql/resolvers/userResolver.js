const userResolver = {
    Query: {
        getUser: () => {
            return { name: "Noman" };
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            return { name: args.name };
        },
    },
}

module.exports = userResolver;
