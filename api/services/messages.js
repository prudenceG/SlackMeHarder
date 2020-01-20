const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const getMessageByChannel = async (channelId) => {
    const messagesList = await dataLayer.getMessageByChannel(channelId);
    const filteredList = messagesList.map(message => {
      return {
        id: message.id,
        content: message.content,
        created_at: message.created_at,
        updated_at: message.updated_at,
        username: message.username,
        userId: message.app_user_id,
      };
    });

    return filteredList;
}

const storeMessage = async (content, channelId, sessionId, socket) => {
    const session = await dataLayer.findSessionById(sessionId);
    const message = await dataLayer.storeMessage(
        content,
        channelId,
        session.user_id
    );
    webSocket.notifyClientOfNewMessage(socket, message);

    return message;
}

const updateMessage = async (id, message, sessionId, socket) => {
    const session = await dataLayer.findSessionById(sessionId);
  
    if (message.userId === session.user_id) {
      await dataLayer.updateOneMessage(message.content, id);
      webSocket.notifyClientMessageHasBeenUpdated(socket, message.content);
    } else {
        throw new Error('Unhautorized');
    }
}

const deleteMessage = async (id, sessionId, socket) => {
    const session = await dataLayer.findSessionById(sessionId);
    const message = await dataLayer.getOneMessage(id);
    
    if (message.app_user_id === session.user_id) {
        await dataLayer.deleteOneMessage(id);
        webSocket.notifyClientMessageHasBeenDeleted(socket);
    } else {
        console.log('error')
        throw new Error('Unhautorized');
    }
}

module.exports = {
    deleteMessage,
    updateMessage,
    getMessageByChannel,
    storeMessage
}