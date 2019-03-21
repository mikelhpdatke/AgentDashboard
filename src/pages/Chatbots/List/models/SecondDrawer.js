import { getTopics } from '@/services/chatbot';
import { message } from 'antd';

export default {
  namespace: 'SecondDrawer',
  state: {
    open: false,
    chatbot: '',
    topics: [],
  },
  effects: {
    *fetchTopics({ payload }, { call, put }) {
      const response = yield call(getTopics, payload);
      if (!response || !response.status) {
        message.error('Lấy danh sách chủ đề lỗi!!');
      }
      // console.log(payload,'??');
      yield put({
        type: 'saveTopics',
        payload: response.data,
      });
      yield put({
        type: 'handle',
        payload: {
          open: true,
          chatbot: payload.TenChatbot,
        },
      });
    },
  },
  reducers: {
    handle(state, action) {
      return {
        ...state,
        open: action.payload.open,
        chatbot: action.payload.chatbot,
      };
    },
    saveTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      };
    },
  },
};
