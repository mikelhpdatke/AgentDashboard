import React from 'react';

export const Content110DataSource = {
  OverPack: {
    className: 'home-page-wrapper content11-wrapper',
    playScale: 0.3,
  },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'image',
        children: 'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
        className: 'title-image',
      },
      {
        name: 'title',
        children: (
          <span>
            <p>Chatbot Web Interface</p>
          </span>
        ),
        className: 'title-h1',
      },
      {
        name: 'content',
        children: (
          <span>
            <p>Cung cấp giải pháp Chatbot</p>
          </span>
        ),
        className: 'title-content',
      },
      {
        name: 'content2',
        children: (
          <span>
            <p>Giải quyết bài toán doanh nghiệp</p>
          </span>
        ),
        className: 'title-content',
      },
    ],
  },
  button: {
    className: '',
    children: {
      a: {
        className: 'button',
        href: '/user/login',
        children: (
          <span>
            <p>Khám phá</p>
            <p>
              <br />
            </p>
          </span>
        ),
      },
    },
  },
};
