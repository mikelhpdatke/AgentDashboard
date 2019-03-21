import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

const codeMessage = {
  200: 'Máy chủ trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi là thành công.',
  202: 'Một yêu cầu đã nhập vào hàng đợi nền (tác vụ không đồng bộ).',
  204: 'Dữ liệu đã bị xóa thành công.',
  400: 'Yêu cầu được thực hiện với một lỗi và máy chủ không thực hiện bất kỳ hoạt động nào để tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền (mã thông báo, tên người dùng, mật khẩu không chính xác).',
  403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm.',
  404: 'Yêu cầu được tạo cho một bản ghi không tồn tại và máy chủ không hoạt động.',
  406: 'Các định dạng của yêu cầu không có sẵn.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không được lấy.',
  422: 'Xảy ra lỗi xác nhận khi tạo một đối tượng.',
  500: 'Xảy ra lỗi trên máy chủ. Vui lòng kiểm tra máy chủ.',
  502: 'Lỗi cổng.',
  503: 'Dịch vụ này không khả dụng và máy chủ tạm thời bị quá tải hoặc bảo trì.',
  504: 'Cổng đã hết thời gian.',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Lỗi yêu cầu ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
    });
}
