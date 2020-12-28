require("dotenv/config")
const amqp = require('amqplib/callback_api');
const url = process.env.CLOUDAMQP_URL;
const { mailer } = require("./mailer")

amqp.connect(url, function(error0, connection){
  if(error0){
    throw error0;
  }
  connection.createChannel(function(error1, channel){
    if (error1){
      throw error1;
    }
    const queue = "send_email";
    channel.assertQueue(queue, {
      durable: true
    })
    channel.prefetch(1);
    console.log(` [X] Awaiting message from ${queue.toUpperCase()} queue`);
    channel.consume(queue, async function reply(message){
      const content = JSON.parse(message.content.toString())

      const resp = await mailer(content)
      console.log(resp, "mailer")
      channel.ack(message)
      console.log(`Completed: An email has been sent to ${content.friendsEmail} - ${new Date()}\n\n`)
      console.log(` [X] Awaiting next message from ${queue.toUpperCase()} queue`);
    })
  })
})

