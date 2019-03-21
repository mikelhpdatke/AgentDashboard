import { getQA } from '@/services/chatbot';
import { message } from 'antd';
// import { connect } from 'dva';

export default {
  namespace: 'recentlyAIML',
  state: {
    data: [],
  },
  effects: {
    *getQA({ TenChatbot, TenTopic}, { call, put }) {
      const response = yield call(getQA, { TenChatbot, TenTopic});
      console.log('in recently...', response);
      if (!response || !response.status) message.error('Lấy thông tin câu hỏi - câu trả lời lỗi');
      // console.log(response);
      yield put({
        type: 'saveRecentlyAIML',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveRecentlyAIML(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
