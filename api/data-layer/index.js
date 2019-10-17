const pg = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const databaseUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

const createChannel = async name => {
  try {
    await pool.query(`INSERT INTO channel (name) VALUES ($1)`, [name]);
  } catch (error) {
    console.log('error: ', error);
  }
};

const getChannels = async () => {
  try {
    const channelList = await pool.query(`SELECT * from channel`);
    return channelList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

const storeMessage = async (content, channelId) => {
  try {
    const message = await pool.query(
      `INSERT INTO message (content,channel_id) VALUES ($1, $2) RETURNING *`,
      [content, channelId]
    );
    return message.rows[0];
  } catch (error) {
    console.log('error : ', error);
  }
};

const getMessageByChannel = async id => {
  try {
    const messagesList = await pool.query(
      ` SELECT * from message WHERE channel_id = $1`,
      [id]
    );
    return messagesList.rows;
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  createChannel,
  getChannels,
  storeMessage,
  getMessageByChannel,
};
