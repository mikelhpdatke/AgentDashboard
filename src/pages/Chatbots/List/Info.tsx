import React from 'react';
import { Form, Input, Tooltip, Icon, Card, Row, Col, Button, Select } from 'antd';
import styles from './Info.less';
import router from 'umi/router';
const { Option } = Select;
import { connect } from 'dva';

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  nextButtonLoading: loading.effects['chatbots/addChatbot'],
}))
class Info extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log('???');
    const { form, dispatch, increaseCurrent } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      console.log(err, values);
      if (!err) {
        // console.log('Received values of form: ', values);
        dispatch({
          type: 'chatbots/addChatbot',
          TenChatbot: values.chatbotName,
          LinhVuc: values.fields,
          GhiChu: values.note,
        });
        // increaseCurrent();
        dispatch({
          type: 'chatbots/fetchChatbots',
        });
        // router.push('/create/defaultQuestion');
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { currentUser, currentUserLoading, nextButtonLoading } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Card title="Thông tin cơ bản">
        {/* <div className={styles.normal}> */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit} layout="horizontal">
          <Row type="flex" justify="center">
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    Tên&nbsp;
                    <Tooltip title="Tên của Chatbot bạn muốn đặt">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('chatbotName', {
                  rules: [
                    { required: true, message: 'Đặt tên cho chatbot của bạn!', whitespace: true },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Lĩnh vực">
                {getFieldDecorator('fields', {
                  rules: [{ required: true, message: 'Chọn lĩnh vực', type: 'array' }],
                })(
                  <Select mode="multiple" placeholder="Chọn lĩnh vực cho bạn">
                    <Option value="Bán hàng">Bán hàng</Option>
                    <Option value="Kiểm toán">Kiểm toán</Option>
                    <Option value="Hành chính">Hành chính</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Ghi chú">
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Điền ghi chú cho chatbot' }],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4} offset={20}>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  // onClick={}
                  className={styles.nextButton}
                  disabled={nextButtonLoading}
                >
                  Tiếp tục
                  <Icon type="right" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default Form.create({ name: 'register' })(Info);
