import { text2Pattern } from '@/services/chatbot';
import Immutable, { Map } from 'immutable';

export default {
    namespace: 'AIMLTable',
    state: {
        hint: Map()
    },
    effects: {
        *text2Pattern( { question, key }, { call, put}) {
            const response = yield call(text2Pattern, { question });
            if (!response || !response.status) return;
            yield put({
                type: 'saveHint',
                payload: {
                    key,
                    question,
                    aiml: response.data,
                }
            })
        }
    },
    reducers: {
        saveHint(state, action){
            const { payload } = action;
            const { key, aiml } = payload;
            return {
                hint: state.hint.set(key, aiml),
            }
        },
    }
}