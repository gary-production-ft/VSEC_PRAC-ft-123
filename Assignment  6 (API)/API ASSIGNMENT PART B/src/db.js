const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
let database;

async function getDatabase() {
  if (!database) {
    await client.connect();
    database = client.db(process.env.MONGODB_DB_NAME || 'api_assignment');
  }

  return database;
}

module.exports = { getDatabase };
