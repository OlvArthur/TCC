const { MongoClient } = require('mongodb')

let cachedDb = null

// const uri = process.env.MONGODB_URI
const uri = 'mongodb+srv://Deploy:Luanny2509!@cluster0.dsehz.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true'
console.log(uri)

const client = new MongoClient(uri)

module.exports = async () => {
  if (cachedDb) return cachedDb

  await client.connect()

  console.log('tentando conectar', cachedDb)
  // const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  await client.db('admin').command({ ping: 1 })
  console.log('Connected successfully to server')
  const db = client.db(new URL(uri).pathname.substr(1))

  cachedDb = db

  return db
}
