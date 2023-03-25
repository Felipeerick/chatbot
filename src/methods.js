import {menu} from '../src/menu.js';

    const conversations = {};

    function handleConversation(client, message) {
        const timeout = 60000;
        const currentTime = Date.now();
        const conversationId = message.from;
    
        if (!conversations[conversationId] || currentTime - conversations[conversationId] > timeout) {
        handleNewConversation(client, message, conversationId, conversations);
        } else {
        handleExistingConversation(client, message, conversationId);
        console.log("Conversa existente")
        }
    }
  
    function handleNewConversation(client, message, conversationId, conversations) {
        switch(message.text){
            case '6':
                 sendGoodbyeMessage(client, message.from);
            break;

            // case '6': 
            //     handleConversation(client, message);
            //     conversations = {};
            // break;

            case '2': 
                setProfileStatus(client, 'Nandinha - Teste 2! ✈️', message.from);
            break;
            
            case '3':
                setProfileStatus(client, 'Nandinha - Teste 3!!! abriremos amanhã as 9h horas!', message.from);
            break;        

            case '4':  
                setProfilePic(client, './store-open.jpg', message.from);
            break;

            case '5': 
                sendAddressMessage(client, message.from);
            break;
            
            default: 
                sendDefaultMessage(client, message.from)
            break;
        }
        
        if(message.text != undefined && message.text != null){
            conversations[conversationId] = Date.now();
            console.log("chegou aqui", typeof(message.text));
        }
        }
  
    function handleExistingConversation(client, message, conversationId) {
        const delay = 2000;
        const timeout = 40000;
    
        setTimeout(() => {
        sendDelayMessage(client, message.from);
        }, delay);
    
        setTimeout(() => {
        delete conversations[conversationId];
        }, timeout);
    }
  
    function setProfileStatus(client, status, from) {
        client.setProfileStatus(status);
        sendTextMessage(client, from, 'Status do perfil alterado!');
    }
  
    function setProfilePic(client, path, from) {
        client.setProfilePic(path);
        sendTextMessage(client, from, 'Foto de perfil aberto');
    }
  
    function sendAddressMessage(client, from) {
        sendTextMessage(client, from,  menu.messages.address);
    }
  
    function sendDefaultMessage(client, from) {
        sendTextMessage(client, from, menu.messages.default);
    }
  
    function sendGoodbyeMessage(client, from) {
        const message = 'Obrigado! Volte sempre!';
        sendTextMessage(client, from, message);
    }
  
   function sendDelayMessage(client, from) {
        const message = 'Espere um minuto antes de enviar outra mensagem, estamos analisando no sistema.';
        sendTextMessage(client, from, message);
    }
  
   function sendTextMessage(client, to, message) {
        client.sendText(to, message)
        .then(() => {
            console.log('Message sent.');
        })
        .catch((error) => {
            console.error('Error when sending message', error);
        });
    }

export default{
    sendTextMessage,
    sendDelayMessage,
    sendGoodbyeMessage,
    sendDefaultMessage,
    sendAddressMessage,
    setProfilePic,
    setProfileStatus,
    handleExistingConversation,
    handleNewConversation,
    handleConversation
}