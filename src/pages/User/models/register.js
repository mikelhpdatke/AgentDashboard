// import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { register } from '@/services/user';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      // console.log(payload);
      const { mail: Email, nickname: HoTen, password: MatKhau, userName: TenDangNhap } = payload;
      const SoDienThoai = payload.prefix + payload.mobile;

      // let response = yield call(register, )
      const response = yield call(register, { Email, HoTen, MatKhau, TenDangNhap, SoDienThoai });
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
