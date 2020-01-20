const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const port = process.env.PORT;
const server = require('./server');

server.listen(port, '0.0.0.0', () => {
  console.log(`Wild Chat app listening on port ${port}!`);
});