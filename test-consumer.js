const amqp = require('amqplib');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange('events', 'topic', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'events', 'ProductRemovedFromCart');

  console.log('Esperando eventos ProductRemovedFromCart...');
  channel.consume(q.queue, (msg) => {
    if (msg) {
      console.log('Evento recibido:', JSON.parse(msg.content.toString()));
    }
  }, { noAck: true });
}

main().catch(console.error);