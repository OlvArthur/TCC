module.exports = async () => {
  const { MongoClient } = require('mongodb')

  let cachedDb = null

  const uri = process.env.MONGODB_URI

  const client = new MongoClient(uri)

  if (cachedDb) return cachedDb
  await client.connect()

  const db = client.db(new URL(uri).pathname.substr(1))
  console.log('Connected successfully to server')

  cachedDb = db

  return db
}
