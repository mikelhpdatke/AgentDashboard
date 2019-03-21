import analysis from './vi-VN/analysis';
import exception from './vi-VN/exception';
import form from './vi-VN/form';
import globalHeader from './vi-VN/globalHeader';
import login from './vi-VN/login';
import menu from './vi-VN/menu';
import monitor from './vi-VN/monitor';
import result from './vi-VN/result';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';
import pwa from './vi-VN/pwa';
import component from './vi-VN/component';

export default {
  'navBar.lang': 'Chọn ngôn ngữ',
  'layout.user.link.help': 'Trợ giúp',
  'layout.user.link.privacy': 'Chính sách',
  'layout.user.link.terms': 'Điều khoản',
  'app.home.introduce': 'Giới thiệu',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
