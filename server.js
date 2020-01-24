const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const webSocket = require('./api/webSocket');
const { setSessionId } = require('./api/utils/setSessionId');
const { authChecker } = require('./api/utils/checkAuth');
const authRouter = require('./api/routes/auth');
const channelsRouter = require('./api/routes/channels');
const messagesRouter = require('./api/routes/messages');

const app = express();
app.use(express.static(path.join(__dirname, 'web-app', 'build')));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(setSessionId);
app.use('/api/auth', authRouter);

const server = http.createServer(app);
const io = require('socket.io').listen(server, {
  pingTimeout: 60000,
});
app.use(webSocket.useSocket(io));

io.on('connection', socket => {
  console.log('user connected');
  app.use(authChecker);
  app.use('/api/channels', channelsRouter);
  app.use('/api/messages', messagesRouter);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'web-app', 'build', 'index.html'), (err) => {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

module.exports = server;