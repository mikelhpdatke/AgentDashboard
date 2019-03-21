// import { stringify } from 'qs';
// import request from '@/utils/request';
import { post, PostAppJson } from '@/utils/httpRequest';
import { ipServer } from '@/utils/utils';
// import { async } from 'q';
// import { func } from 'prop-types';

export async function getChatbots(params) {
  return PostAppJson(`${ipServer}/api/chatbot/list`, params);
}

export async function getTopics(params) {
  return PostAppJson(`${ipServer}/api/chatbot/topic/list`, params);
}

export async function addChatbot(params) {
  return PostAppJson(`${ipServer}/api/chatbot/create`, params);
}

export async function addTopic(params) {
  return PostAppJson(`${ipServer}/api/chatbot/add_chatbot_topic`, params);
}

export async function text2Pattern(params) {
  return PostAppJson(`${ipServer}/api/question/get_pattern`, params);
}

export async function pushData(params) {
  return PostAppJson(`${ipServer}/api/question/add_to_topic`, params);
}

export async function getQA(params) {
  return PostAppJson(`${ipServer}/api/question/get_from_topic`, params);
}

export async function getRecentlyAIML(params) {
  return post('http://34.73.92.252:3000/aimlquestions', params);
}
