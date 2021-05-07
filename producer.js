require('dotenv').config();

const kafka = require('./kafka')

const producer = kafka.producer();


const main = async () => {
    await producer.connect();
  
      // Send message to Kafka
    try {
        const responses = await producer.send({
          topic: 'test-topic',
          // topic: process.env.TOPIC,
          messages: [{
            // Name of the published package as key, to make sure that we process events in order
            key: 'this is a test-topic event!',
    
            // The message value is just bytes to Kafka, so we need to serialize our JavaScript
            // object to a JSON string. Other serialization methods like Avro are available.
            value: JSON.stringify({
              package: 'somePacakge',
              version: 'version 500001'
            })
          }]
        })
    
        console.log('Published message', { responses })
      } catch (error) {
        console.error('Error publishing message', error)
      }  
  
    }
  
  main().catch(error => {
    console.error(error)
    process.exit(1)
  })