export default [
  // home
  // {
  //   path: '/home',
  //   component: './Home',
  // },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
    // authority: ['admin'], // only admin can access
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      // { path: '/dashboard', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Monitor',
        authority: ['admin'],
      },
      // Quản lý chatbot
      // {
      //   path: '/chatbots',
      //   name: 'chatbotManagement',
      //   icon: 'form',
      //   routes: [
      //     {
      //       path: '/chatbots/list',
      //       name: 'listchatbot',
      //       icon: 'ordered-list',
      //       component: './Chatbots/List/List',
      //       authority: ['admin'],
      //     },
      //     {
      //       path: '/chatbots/inputQA',
      //       name: 'inputPersonalData',
      //       icon: 'reconciliation',
      //       component: './Chatbots/InputQA/InputQA',
      //       authority: ['admin'],
      //     },
      //   ],
      // },

      {
        name: 'user',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'profile',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
                authority: ['admin'],
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
                authority: ['admin'],
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
                authority: ['admin'],
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'setting',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
                authority: ['admin'],
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
                authority: ['admin'],
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
                authority: ['admin'],
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
                authority: ['admin'],
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
