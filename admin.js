const kafka = require('./kafka');
// const topic = process.env.TOPIC
const topic = 'test-topic'
const admin = kafka.admin()

const main = async () => {
  await admin.connect()
  await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
