import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getFakeCaptcha } from '@/services/api';
import { setAuthority, setToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { login as loginRequest } from '@/services/user';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { userName: TenDangNhap, password: MatKhau } = payload;
      // let response = yield call(loginRequest, { TenDangNhap, MatKhau });
      // console.log('in login..', response, payload);
      let response = {
        status: true,
        token: "3_WjmMFHtq97EP9qffBYMBVOzCl.M2eaupeJvbYYHFD"
      };
      response = {
        ...response,
        // type: 'changeLoginStatus',
        currentAuthority: 'admin',
        TenDangNhap: 'admin',
      };
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/dashboard'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.token);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
