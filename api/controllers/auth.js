const authService = require('../services/auth');

const signup = async (req, res) => {
  const { username, password } = req.body;
  const sessionId = req.cookies.sessionId;
  try {
    const user = await authService.signup(username, password, sessionId);
    res.status(201).send(user.username);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  const sessionId = req.cookies.sessionId;
  try {
    await authService.signIn(username, password, sessionId);
    res.status(201).send('connected');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const whoAmI = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  try {
    const user = await authService.whoAmI(sessionId)
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  signup,
  signin,
  whoAmI
};
