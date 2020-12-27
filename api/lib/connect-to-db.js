// module.exports = async () => {
export default async () => {
  // const dbCollection = process.env.MONGODB_COLLECTION
  // const dbCollection = 'results'

  const { MongoClient } = require('mongodb')

  let cachedDb = null

  // const uri = process.env.MONGODB_URI
  // const uri = 'mongodb+srv://Deploy:Luanny2509!@cluster0.dsehz.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true'
  const uri = 'mongodb+srv://Deploy:Luanny2509!@cluster0.dsehz.mongodb.net/test'

  console.log(uri)

  const client = new MongoClient(uri)
  console.log('chegou na conexão')

  try {
    if (cachedDb) return cachedDb
    await client.connect()
    console.log('tentando conectar', cachedDb)

    await client.db('admin').command({ ping: 1 })

    const db = client.db(new URL(uri).pathname.substr(1))
    console.log('Connected successfully to server')

    cachedDb = db

    return db
  } catch (err) {
    console.log(err.stack)
  }

  // const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}
