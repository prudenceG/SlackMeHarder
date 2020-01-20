const dataLayer = require('../data-layer');
const webSocket = require('../webSocket');

const createChannel = async (req, res) => {
  const name = req.body.name;
  try {
    await dataLayer.createChannel(name);
    webSocket.notifyClienOfNewChannel(req.socket, name);
    res.status(201).send(name);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getChannels = async (req, res) => {
  try {
    const channelsList = await dataLayer.getChannels();
    res.status(200).send(channelsList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createChannel,
  getChannels,
};
