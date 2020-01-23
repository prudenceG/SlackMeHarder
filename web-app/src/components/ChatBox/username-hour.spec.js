import React from 'react';
import Messages from './Messages';
import * as apiServices from '../../data/services/api';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

const sameUserMoreOneMinuteBetweenMessages = [
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
    updated_at: '2019-12-10 10:11:12.881995',
    username: 'Prudence',
    id: 1
  }
]

const sameUserLessOneMinuteBetwwenMessages = [
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
    updated_at: '2019-12-10 10:10:12.881995',
    username: 'Prudence',
    id: 1
  }
]

const otherUserMessages = [
  {
    userId: 25,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:09.881995',
    username: 'Prudence',
    id: 0
  },
  {
    userId: 26,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:10:12.881995',
    username: 'Sarah',
    id: 1
  },
  {
    userId: 27,
    content: 'test message writed by a user at a certain hour',
    updated_at: '2019-12-10 10:15:12.881995',
    username: 'Rémi',
    id: 2
  }
]


describe('Messages', () => {
  apiServices.fetchMessages = jest.fn();
  apiServices.whoAmI = jest.fn();

  describe('Username and hour bloc in the posted message', () => {
    describe('when the last message is published by the same user\
    and less than a minute apart', () => {
      apiServices.fetchMessages.mockImplementationOnce(() =>
        Promise.resolve(sameUserLessOneMinuteBetwwenMessages)
      );

      it('should not exists', () => {
        // act(() => {
        let wrapper = mount(<Messages match={{ params: { id: 1 } }} />)
        const lengths = [2, 1]
        setImmediate(() => {
          wrapper.update();
          wrapper.find('.container__message').forEach((node, i) => {
            expect(node.children()).toHaveLength(lengths[i])
          })
        })
        // })
      })
    })

    describe('when the last message is published by the same user\
    and more than a minute apart', () => {
      apiServices.fetchMessages.mockImplementationOnce(() =>
        Promise.resolve(sameUserMoreOneMinuteBetweenMessages)
      );

      it('should exists', () => {
        // act(() => {
        let wrapper = mount(<Messages match={{ params: { id: 1 } }} />)
        const lengths = [2, 2]
        setImmediate(() => {
          wrapper.update();
          wrapper.find('.container__message').forEach((node, i) => {
            expect(node.children()).toHaveLength(lengths[i])
          })
        })
        // })
      })
    })

    describe('when the last message is published by another user\
    and more or less than a minute apart', () => {
      apiServices.fetchMessages.mockImplementationOnce(() => {
        Promise.resolve(otherUserMessages);
      })
      it('should exists', () => {
        // act(() => {
        let wrapper = mount(<Messages match={{ params: { id: 1 } }} />)
        const lengths = [2, 2, 2]
        setImmediate(() => {
          wrapper.update();
          wrapper.find('.container__message').forEach((node, i) => {
            expect(node.children()).toHaveLength(lengths[i])
          })
        })
        // })
      })
    })
  })
})