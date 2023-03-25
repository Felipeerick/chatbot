import { create } from 'venom-bot';
import methods from './methods.js';

create({
    session: 'store',
    multidevice: true,
    headless: false,
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  function start(client) {
    client.onMessage((message) => {
      if (!message.isGroupMsg) {
        methods.handleConversation(client, message);
      }
    });
}