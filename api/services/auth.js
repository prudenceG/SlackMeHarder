const dataLayer = require('../data-layer');

const signup = async (username, password, sessionId) => {
  const user = await dataLayer.findUserByUsername(username);

  if (user) {
    throw new Error('Username already taken');
  } else {
    const userCreated = await dataLayer.createUser(username, password);
    await dataLayer.updateSession(sessionId, userCreated.id);

    return userCreated;
  }
}

const signIn = async (username, password, sessionId) => {
  const user = await dataLayer.verifyUser(username, password);
  if (user) {
    await dataLayer.updateSession(sessionId, user.id);
  } else {
    throw new Error('User not found');
  }
}

const whoAmI = async (sessionId) => {
  const session = await dataLayer.findSessionById(sessionId);
  if (session && session.user_id) {
    const user = await dataLayer.findUserById(session.user_id);

    return user;
  } else {
    throw new Error('User not found');
  }
}

module.exports = {
  signup,
  signIn,
  whoAmI
}