import { getChatbots, getTopics, addTopic, addChatbot, pushData } from '@/services/chatbot';
// import { connect } from 'dva';
import { message } from 'antd';
import avatar from '@/assets/bot.png';
import avatar2 from '@/assets/bot2.png';
import avatar3 from '@/assets/bot3.png';
import avatar4 from '@/assets/bot4.png';

const listAvatars = [avatar, avatar2, avatar3, avatar4];
export default {
  namespace: 'chatbots',
  state: {
    chatbots: [],
    topics: [],
    chatbot: '',
    topic: '',
  },
  effects: {
    *pushData({ TenChatbot, TenTopic, CauHoiDayDu, CauHoiAIML, CauTraLoi }, { call, put }) {
      const response = yield call(pushData, {
        TenChatbot,
        TenTopic,
        CauHoiDayDu,
        CauHoiAIML,
        CauTraLoi,
      });
      if (!response || !response.status) 
        message.error('Lưu không thành công, hãy thử lại sau');
      else 
        message.success('Lưu thành công!');
    },
    *addChatbot({ TenChatbot, LinhVuc, GhiChu }, { call, put }) {
      const response = yield call(addChatbot, { TenChatbot, LinhVuc, GhiChu });
      if (!response || !response.status) message.error('Thêm chatbot bị lỗi');
      else {
        message.success('Thêm chatbot thành công');
        yield put({
          type: 'drawerList/increaseCurrent',
        })
      }
    },
    *fetchChatbots(obj, { call, put }) {
      const response = yield call(getChatbots, {});
      // console.log('in effect...', response);
      if (!response || !response.status) message.error('Lấy thông tin chatbot bị lỗi');
      else {
        yield put({
          type: 'getChatbots',
          payload: response.data,
        });
        // console.log(response.data);
        const newListChatbot = response.data.map((chatbot, index) => ({
          id: index,
          title: chatbot.TenChatbot,
          avatar: listAvatars[index % 4],
          description: `${chatbot.GhiChu}`,
          fields: chatbot.LinhVuc.reduce((a, b) => `${a},${b}`),
        }));
        // console.log(newListChatbot);
        yield put({
          type: 'list/queryList',
          payload: newListChatbot,
        });
      }
    },
    *addTopic({ payload }, { call, put }) {
      const response = yield call(addTopic, payload);
      if (!response || !response.status) message.error('Thêm chủ đề bị lỗi');
      else message.success('Thêm chủ đề thành công');
      // console.log(payload);
      // yield call({
      //   type: 'fetchTopics',
      //   payload: { TenChatbot: payload.TenChatbot },
      // });
    },
    *fetchTopics({ payload }, { call, put }) {
      const response = yield call(getTopics, payload);
      if (!response || !response.status) message.error('Lấy thông tin topic bị lỗi');
      yield put({
        type: 'getTopics',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveChatbot(state, action) {
      return {
        ...state,
        chatbot: action.payload,
      };
    },
    saveTopic(state, action) {
      return {
        ...state,
        topic: action.payload,
      };
    },
    getChatbots(state, action) {
      return {
        ...state,
        chatbots: action.payload,
      };
    },
    getTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/chatbots/inputQA') {
          dispatch({
            type: 'fetchChatbots',
          });
        }
      });
    },
  },
};
