const graphql = require('graphql');
const AuthType = require('schema/types/authType');
const Viewer = require('utils/viewer');

const mutation = {
    type: AuthType,
    args: {
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString }
    },
    async resolve(parentValue, args) {
        return Viewer.generateToken(args.username, args.password);
    }
};

module.exports = {
    mutation
};
