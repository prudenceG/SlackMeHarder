import React from 'react';
import * as apiServices from '../../data/services/api';
import Messages from './Messages';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

const messagesList = [
  {
    id: 0,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:09.881995',
    username: 'Prudence',
  },
  {
    id: 1,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:15:09.881995',
    username: 'Prudence',
  },
  {
    id: 2,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
  },
];

const addMessageToList = [
  {
    id: 0,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:09.881995',
    username: 'Prudence',
  },
  {
    id: 1,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:15:09.881995',
    username: 'Prudence',
  },
  {
    id: 2,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
  },
  {
    id: 3,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:17:09.881995',
    username: 'Prudence',
  },
];

apiServices.fetchMessages = jest.fn();

describe('Messages', () => {
  describe('before messages are fetched', () => {
    let wrapper = shallow(<Messages match={{ params: { id: 1 } }} />);
    it('renders empty messages list', () => {
      expect(wrapper.find('.container__message')).toHaveLength(0);
    });
  });

  describe('after messages are fetched', () => {
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(messagesList)
    );

    it('renders messages list', () => {
      act(() => {
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
  });

  describe('when user send a message by clicking on submit button', () => {
    apiServices.fetchMessages.mockImplementationOnce(() =>
      Promise.resolve(addMessageToList)
    );

    it('renders a new item in the messages list', () => {
      act(() => {
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
});
