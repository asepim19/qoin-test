const amqp = require('amqplib/callback_api');
const model = require('../src/models/model');

amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672', (error, connection) => {
  if (error) {
    throw error;
  }

  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    const queue = 'qtest1';

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(`[*] Waiting for messages in ${queue}. To exit, press CTRL+C`);

    channel.consume(queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      handleRabbitMQMessage(data);
    }, {
      noAck: true,
    });
  });
});

async function handleRabbitMQMessage(data) {
  switch (data.command) {
    case 'create':
      await model.create(data.data);
      break;
    case 'update':
      await model.update(data.data.Id, data.data);
      break;
    case 'delete':
      await model.del(data.data.Id);
      break;
    default:
      console.log(`[x] Unknown command: ${data.command}`);
  }
}
