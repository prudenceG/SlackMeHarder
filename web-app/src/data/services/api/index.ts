import axios from 'axios';

// Channels

export const fetchChannels = async (): Promise<Channel[]> => {
  const response = await axios.get(`/api/channels`);
  const channels = response.data;

  return channels;
};

export const createChannel = async (name: string): Promise<void> => {
  await axios.post(`/api/channels`, {
    name,
  });
};

// Messages

export const fetchMessages = async (id: number): Promise<Message[]> => {
  const response = await axios.get(`/api/messages?channel_id=${id}`);
  const messages = response.data;

  return messages;
};

export const postMessages = async (content: string, channelId: number): Promise<void> => {
  const data = { content, channelId };
  await axios.post(`/api/messages`, data);
};

export const putMessage = async (message: any): Promise<void> => {
  await axios.put(`/api/messages/${message.id}`, { content: message.content });
}

export const deleteOneMessage = async (id: number): Promise<void> => {
  await axios.delete(`/api/messages/${id}`);
}

// auth

export const signIn = async (username: string, password: string): Promise<void> => {
  const data = { username, password };
  await axios.post(`/api/auth/signin`, data);
};

export const signUp = async (username: string, password: string): Promise<void> => {
  const data = { username, password };
  await axios.post(`/api/auth/signup`, data);
};

export const whoAmI = async (): Promise<User> => {
  const response = await axios.get(`/api/auth/whoami`);
  const user = response.data;

  return user;
};
