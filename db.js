const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost")
    .then(conn => global.conn = conn.db("cinema"))
    .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("cinema").find().toArray();
}

function insert(customer) {
    return global.conn.collection("cinema").insertOne(customer);
}

const ObjectId = require("mongodb").ObjectId;

function findOne(id) {
    return global.conn.collection("cinema").findOne(new ObjectId(id));
}

function update(id, customer) {
    return global.conn.collection("cinema").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}
function deleteOne(id) {
    return global.conn.collection("cinema").deleteOne({ _id: new ObjectId(id) });
}

module.exports = { findAll, insert, findOne, update, deleteOne }
