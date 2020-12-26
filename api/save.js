const connectToDb = require('./lib/connect-to-db')
const validate = require('./lib/validate-test')
const dbCollection = process.env.MONGODB_COLLECTION

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.send('ok!')
    return
  }

  console.log('chegou aqui')
  const { body: payload } = req

  if (!payload) {
    res.status(400).json({ type: 'error', message: 'Not a valid payload' })
    return
  }

  const { error } = validate(payload)
  const isValid = !error

  console.log('chegou aqui 2')

  if (!isValid) {
    res.status(400).json({ type: 'error', message: error })
    return
  }
  console.log('chegou aqui 3')

  try {
    const db = await connectToDb()
    const collection = db.collection(dbCollection)

    const data = await collection.insertOne(payload)
    res.send({ id: data.insertedId })
    console.log('chegou aqui 4')

    return
  } catch (error) {
    console.log('chegou aqui 5')

    res.status(500).json({ type: 'error', message: error.message })
  }
}
