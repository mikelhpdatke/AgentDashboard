import React, { Suspense } from 'react';
import { Form, Icon, Button, Drawer, message, Input } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import _ from 'lodash';
import styles from './SecondDrawer.less';
import Result from '@/components/Result';
import PageLoading from '@/components/PageLoading';

const Modify = React.lazy(() => import('./Modify'));
// const Info = React.lazy(() => import('./Info'));

@connect(({ SecondDrawer, loading }) => ({
  SecondDrawer,
  loading: loading.models.SecondDrawer,
}))
class SecondDrawerComponent extends React.Component {
  state = {
    current: 0,
    childrenDrawer: false,
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(this.props.SecondDrawer);
      console.log(values);
      dispatch({
        type: 'chatbots/addTopic',
        payload: {
          TenChatbot: _.get(this.props.SecondDrawer, 'chatbot', ''),
          TenTopic: values.topic,
          NoiDung: values.content,
          GhiChu: values.note,
        }
      });
      dispatch({
        type: 'chatbots/fetchTopics',
        payload: {
          TenChatbot: _.get(this.props.SecondDrawer, 'chatbot', ''),
        }
      });
      dispatch({
        type: 'SecondDrawer/fetchTopics',
        payload: {
          TenChatbot: _.get(this.props.SecondDrawer, 'chatbot', ''),
        }
      });
      this.onChildrenDrawerClose();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { SecondDrawer, loading } = this.props;
    const drawerWidth = window.innerWidth > 760 ? '60vw' : '90vw';
    const childDrawerWidth = window.innerWidth > 760 ? '30vw' : '50vw';
    // console.log(SecondDrawer);
    return (
      <Drawer
        title={`Chỉnh sửa chatbot: ${_.get(SecondDrawer, 'chatbot', '')}`}
        loading={loading}
        width={drawerWidth}
        onClose={() => {
          this.props.dispatch({
            type: 'SecondDrawer/handle',
            payload: { open: false, chatbot: '' },
          });
        }}
        visible={SecondDrawer.open}
        style={{
          overflow: 'auto',
          height: '100%',
          // paddingBottom: '108px',
        }}
      >
        <Drawer
          title={`Thêm chủ đề cho chatbot: ${_.get(SecondDrawer, 'chatbot', '')}`}
          width={childDrawerWidth}
          closable={false}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.childrenDrawer}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  Chủ đề
                </span>
              }
            >
              {getFieldDecorator('topic', {
                rules: [
                  { required: true, message: 'Nhập chủ đề '},
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Nội dung
                </span>
              }
            >
              {getFieldDecorator('content', {
                rules: [
                  { required: true, message: 'Nhập nội dung'},
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Ghi chú
                </span>
              }
            >
              {getFieldDecorator('note', {
                rules: [
                  { required: true, message: 'Nhập ghi chú'},
                ],
              })(<Input />)}
            </Form.Item>
            <Button type="primary" htmlType="submit">
            Thêm
            </Button>
          </Form>
        </Drawer>
        <Suspense fallback={<PageLoading />}>
          <Modify showChildrenDrawer={this.showChildrenDrawer} />
        </Suspense>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'CreateNewTopicForm' })(SecondDrawerComponent);
