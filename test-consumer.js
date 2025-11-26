const amqp = require('amqplib');

(async () => {
  // Cambia a localhost para ejecución local
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertExchange('events', 'topic', { durable: false });
  const q = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(q.queue, 'events', 'ProductUpdated');
  await channel.bindQueue(q.queue, 'events', 'ProductRemovedFromCart');
  await channel.bindQueue(q.queue, 'events', 'BundleCreated');
  await channel.bindQueue(q.queue, 'events', 'UserAuthenticated');

  console.log('Esperando eventos ProductUpdated, ProductRemovedFromCart, BundleCreated y UserAuthenticated...');
  channel.consume(q.queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Evento recibido:', msg.fields.routingKey, data);
    }
  }, { noAck: true });
})().catch(console.error);