const graphql = require('graphql');
const LightSchema = require('schema/lightSchema');
const DeviceSchema = require('schema/deviceSchema');
const MotorSchema = require('schema/motorSchema');
const LogSchema = require('schema/logSchema');
const RoomSchema = require('schema/roomSchema');
const NodeSchema = require('schema/nodeSchema');
const UserSchema = require('schema/userSchema');
const AuthSchema = require('schema/authSchema');

const queryType = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        light: LightSchema.find(),
        device: DeviceSchema.find(),
        motor: MotorSchema.find(),
        log: LogSchema.find(),
        room: RoomSchema.find(),
        node: NodeSchema.find(),
        user: UserSchema.query(),
    }
});

const mutationType = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        light: LightSchema.mutation(),
        device: DeviceSchema.mutation(),
        motor: MotorSchema.mutation(),
        log: LogSchema.mutation(),
        room: RoomSchema.mutation(),
        node: NodeSchema.mutation(),
        user: UserSchema.mutation(),
        token: AuthSchema.mutation(),
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
