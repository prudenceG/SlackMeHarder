const dataLayer = require('../data-layer');

const setSessionId = async (req, res, next) => {
  const cookie = req.cookies.sessionId;
  if (cookie === undefined) {
    const randomNumber = Math.random().toString();
    const sessionId = randomNumber.substring(2, randomNumber.length);
    const sessionExists = await dataLayer.findSessionById(sessionId);
    if (!sessionExists) {
      await dataLayer.createSession(sessionId, null);
    }
    res.cookie('sessionId', sessionId, { maxAge: 999900000, httpOnly: true, sameSite: "lax" });
  } else {
    console.log('cookie exists', cookie);
  }
  next();
};

module.exports = { setSessionId };
