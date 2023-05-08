import { create } from 'venom-bot';

const hoje = new Date();

create({
  session: 'store',
  headless: false,
})
  .then((client) => start(client))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

 function takeToday(client){
    if (hoje.getDay() != 0) {
      client.setProfileStatus('Estamos abertos!');
      return true;
    } else {
      client.setProfileStatus('Estamos fechados!');
      return false;
    }
  };

  function responseToTheImpatientUser(client, message){
    let attempts = 0;
    const interval = setInterval(() => {
      if (attempts >= 3) {
        clearInterval(interval);
        client.sendText(message.from, 'Estamos procurando um atendente, espere alguns minutos.');
        attempts = 0;
        setTimeout(() => {
          client.sendText(message.from, 'Posso ajudar em algo mais? Selecione uma opção: (4) - Voltar para o menu principal, (5) - Finalizar atendimento');
        }, 120000); // espera 2 minutos
      } else {
        attempts++;
        client.sendText(message.from, 'Estamos procurando um atendente, espere alguns minutos.');
      }
    }, 5000); // espera 5 segundos entre cada tentativa
  }

function start(client) {
  let workingDay = takeToday(client);
  let listenerId;
  let messageFrom;
  client.onMessage((message) => {
    messageFrom = message.from;
    console.log(message, "objeto da mensagem\n\n");
    console.log(message.from.count() < 18, "boolean");
    

    if (message.isGroupMsg === false && message.chat.isGroup === false && messageFrom.length < 18) {
      if (!workingDay) {
        client.sendText(message.from, 'Estamos fechados. Horário de funcionamento somente das 8 as 18 horas, de segunda a sábado.');
      } else {
            // console.log(message, "messagem comum"),
            // console.assert("=================================="),

            if(listenerId == null || undefined || '' && listenerId != message.id){
              client.sendText(message.from, 'Olá, bem-vindo à Nandinha! Em que posso ajudar? Selecione uma opção: (1) => Formas de contato, (2) => Falar com atendente, (3) => Finalizar atendimento');
              listenerId = message.id;
              console.log("Valor do listernerId é: ", listenerId);
            }
            
            switch (message.body) {
              case '1':
                client.sendText(message.from, 'Nosso número fictício é (11) 9999-9999. Posso ajudar em algo mais? Selecione uma opção: 4 - Voltar para o menu principal, 5 - Finalizar atendimento');
                break;
              case '2':
                client.sendText(message.from, 'Aguarde um momento, estamos chamando nossos atendentes.');
                //responseToTheImpatientUser(client, message);
                break;
              case '3':
                client.sendText(message.from, 'Obrigado por entrar em contato com a Nandinha. Volte sempre!');
                listenerId = null;
                break;
              case '4':
                client.sendText(message.from, 'Selecione uma opção: 1 - Formas de contato, 2 - Falar com atendente, 3 - Finalizar atendimento');
                break;
              case '5':
                client.sendText(message.from, 'Obrigado por entrar em contato com a Nandinha. Volte sempre!');
                listenerId = null;
                break;
              // default:
              //   client.sendText(message.from, 'Opção inválida. Selecione uma opção: 1 - Formas de contato, 2 - Falar com atendente, 3 - Finalizar atendimento');
            }
        };
      };
  });
};
