const mongo = require('db/mongo');
const Viewer = require('utils/viewer');

const find = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    return await mongo.db().collection('devices').findOne({ _id: mongo.id.new(args._id) });
};

const all = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    return await mongo.db().collection('devices').find().toArray();
};

const create = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const insertedDocuments = await mongo.db().collection('devices').insertOne(args.device);

    return insertedDocuments.ops[0];
};

const update = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const updatedDocuments = await mongo.db().collection('devices').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
        $set: args.device
    });

    return updatedDocuments.value;
};

const deletion = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const deletedDocuments = await mongo.db().collection('devices').findOneAndDelete({ _id: mongo.id.new(args._id) });

    return deletedDocuments.value;
};

module.exports = {
    find,
    all,
    create,
    update,
    deletion
};
