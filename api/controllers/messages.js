const messagesService = require('./../services/messages');

const getMessagesByChannel = async (req, res) => {
  const channelId = req.query.channel_id;
  try {
    const messages = await messagesService.getMessageByChannel(channelId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const storeMessage = async (req, res) => {
  const { content, channelId } = req.body;
  const sessionId = req.cookies.sessionId;
  const socket = req.socket;

  try {
    await messagesService.storeMessage(content, channelId, sessionId, socket);
    res.status(201).send({ message: 'Message has been successfuly created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMessage = async (req, res) => {
  const message = req.body.message;
  const id = req.params.id;
  const sessionId = req.cookies.sessionId;
  const socket = req.socket;
  try {
    await messagesService.updateMessage(id, message, sessionId, socket);
    res.status(201).send('a message has been updated');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  const sessionId = req.cookies.sessionId;
  const socket = req.socket;
  try {
    await messagesService.deleteMessage(id, sessionId, socket);
    res.status(200).json({ message: 'Message has been successfuly deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  storeMessage,
  updateMessage,
  deleteMessage,
  getMessagesByChannel,
};
