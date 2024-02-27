const amqp = require('amqplib/callback_api');

const sendMessage = (command, data) => {
  amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost', (error, connection) => {
    if (error) {
      throw error;
    }

    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }

      const queue = 'qtest1';
      const message = JSON.stringify({ command, data });

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`[x] Sent message: ${message}`);
    });
  });
};

module.exports = { sendMessage };
