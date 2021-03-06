const graphql = require('graphql');
const handlers = require('handlers/lightHandler');
const RoomType = require('schema/types/roomType');
const NodeType = require('schema/types/nodeType');
const LightInput = require('schema/inputs/lightInput');
const MongoId = require('schema/scalars/mongoIdScalar');

const type = new graphql.GraphQLObjectType({
    name: 'Light',
    description: 'light type',
    fields: {
        _id: { type: MongoId },
        id: { type: graphql.GraphQLInt },
        status: { type: graphql.GraphQLBoolean },
        name: { type: graphql.GraphQLString },
        room_id: { type: MongoId },
        node_id: { type: MongoId },
        room: {
            type: RoomType.type,
            async resolve(parentValue, args, context) {
                return handlers.rooms(parentValue, args, context);
            }
        },
        node: {
            type: NodeType.type,
            async resolve(parentValue, args, context) {
                return handlers.nodes(parentValue, args, context);
            }
        },
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'LightQuery',
    description: 'light query type',
    fields: {
        find: {
            type,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        all: {
            type: graphql.GraphQLList(type),
            async resolve(parentValue, args, context) {
                return handlers.all(parentValue, args, context);
            }
        },
    }
});

const mutation = new graphql.GraphQLObjectType({
    name: 'LightMutation',
    description: 'light mutation type',
    fields: {
        create: {
            type,
            args: {
                light: { type: LightInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                light: { type: LightInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.update(parentValue, args, context);
            }
        },

        delete: {
            type,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args, context) {
                return handlers.deletion(parentValue, args, context);
            }
        }
    }
});

module.exports = {
    query,
    mutation
};
