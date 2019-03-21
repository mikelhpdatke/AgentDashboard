import React from 'react';
import { getChatbots } from '@/services/chatbot';
import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import avatar from '@/assets/bot.png';
import avatar2 from '@/assets/bot2.png';
import avatar3 from '@/assets/bot3.png';
import avatar4 from '@/assets/bot4.png';

const listAvatars = [avatar, avatar2, avatar3, avatar4];
export default {
  namespace: 'list',
  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      let response = yield call(getChatbots, payload);
      // console.log(response);
      const { status, data } = response;
      if (!status) return;

      response = data.map((chatbot, index) => ({
        id: index,
        title: chatbot.TenChatbot,
        avatar: listAvatars[index % 4],
        description: `${chatbot.GhiChu  }`,
        fields:  chatbot.LinhVuc.reduce((a, b)=> (`${a  },${  b}`))
      }))
      // console.log(response);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
