const graphql = require('graphql');
const MongoId = require('scalars/mongoIdScalar');
const rolesEnum = require('enums/rolesEnum');

module.exports = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'user type',
    fields: {
        _id: { type: MongoId },
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        roles: { type: graphql.GraphQLList(rolesEnum) }
    }
});
