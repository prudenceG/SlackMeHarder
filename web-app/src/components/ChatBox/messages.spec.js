import React from 'react';
import * as apiServices from '../../data/services/api';
import Messages from './Messages';
import { mount } from 'enzyme';

const messagesList = [
  {
    userId: 23,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:09.881995',
    username: 'Prudence',
    id: 0,
  },
  {
    userId: 23,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:15:09.881995',
    username: 'Prudence',
    id: 1,
  },
  {
    userId: 23,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
    id: 2,
  },
];

const addMessageToList = [
  {
    userId: 25,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:09.881995',
    username: 'Prudence',
    id: 0
  },
  {
    userId: 25,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:15:09.881995',
    username: 'Prudence',
    id: 1
  },
  {
    userId: 25,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
    id: 2
  },
  {
    userId: 25,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
    id: 3
  },
];

apiServices.fetchMessages = jest.fn();
apiServices.whoAmI = jest.fn();

describe('Messages', () => {
  describe('before messages are fetched', () => {
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve([])
    );
    it('renders empty messages list', () => {
      let wrapper;
      wrapper = mount(<Messages match={{ params: { id: 1 } }} />);
      expect(wrapper.find('.container__message')).toHaveLength(0);
    })
  });

  describe('after messages are fetched', () => {
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(messagesList)
    );

    it('renders messages list', () => {
      let wrapper = mount(<Messages match={{ params: { id: 1 } }} />);
      setImmediate(() => {
        wrapper.update();
        expect(apiServices.fetchMessages).toHaveBeenCalled();
        expect(wrapper.find('.container__message')).toHaveLength(
          messagesList.length
        );
      });

    });
  });

  describe('when user send a message by clicking on submit button', () => {
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(addMessageToList)
    );

    it('renders a new item in the messages list', () => {
      let wrapper = mount(<Messages match={{ params: { id: 1 } }} />);
      // const button = wrapper.find('.button__chat__sendbox');
      // await button.simulate('click');
      setImmediate(() => {
        wrapper.update();
        expect(apiServices.fetchMessages).toHaveBeenCalled();

        expect(wrapper.find('.container__message')).toHaveLength(
          messagesList.length + 1
        );
      });
    });
  });
});
