import React, { Suspense } from 'react';
import { Icon, Select, Row, Col, Form, Input, Timeline, Alert, Button, Card } from 'antd';
import styles from './InputQA.less';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const Option = Select.Option;
import _ from 'lodash';
const RecentlyAIMLTable = React.lazy(() => import('./RecentlyAIML/RecentlyAIML.jsx'));
const EditableTable = React.lazy(() => import('./Table/Table'));

@connect(({ chatbots, loading, dispatch }) => ({
  chatbots,
  dispatch,
  loading: loading.models.chatbots,
  loadingTopics: loading.effects['chatbots/fetchTopics'],
  loadingChatbots: loading.effects['chatbots/fetchChatbots'],
}))
class CustomQuestion extends React.Component {
  state = {
    // save Question / AIML
    qaLists: [],
  }
  handleChange = value => {
    // console.log(`selected ${value}`);
    const { dispatch } = this.props;
    dispatch({
      type: 'chatbots/saveChatbot',
      payload: value,
    });
    dispatch({
      type: 'chatbots/fetchTopics',
      payload: { 
        TenChatbot: value,
      }
    });
    dispatch({
      type: 'chatbots/saveTopic',
      payload: '',
    });
  };

  handleChangeTopic = value => {
    const { dispatch, chatbots } = this.props;
    dispatch({
      type: 'chatbots/saveTopic',
      payload: value,
    });
    dispatch({
      type: 'recentlyAIML/getQA',
      TenChatbot: chatbots.chatbot,
      TenTopic: value,
    });
  };

  handleSaveQA = value => {
    this.setState({qaLists : value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, chatbots, dispatch } = this.props;
    const { chatbot, topic } = chatbots;
    const { qaLists } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, chatbot, topic, this.state.qaLists);
        dispatch({
          type: 'chatbots/pushData',
          TenChatbot : chatbot, 
          TenTopic: topic, 
          CauHoiDayDu: qaLists.map(val => val.textQuestion), 
          CauHoiAIML: qaLists.map(val => val.textAIML), 
          CauTraLoi: values.answer,
        });
        dispatch({
          type: 'recentlyAIML/getQA',
          TenChatbot: chatbots.chatbot,
          TenTopic: topic,
        });
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const { chatbots, loading, loadingChatbots, loadingTopics } = this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log(chatbots, loading);
    const { chatbot, topic } = chatbots;
    const disabledButton = chatbot == '' || topic == '';
    // console.log(chatbot, chatbots);
    // console.log(chatbots);
    // console.log(chatbot, topic);
    // console.log(chatbots.chatbots);
    let alertMess = "Bạn có thể nhập nhiều câu hỏi và 1 câu trả lời";
    let typeMess = "info",

    if (chatbot !== '' && topic === '') {
      alertMess = "Chatbot: " + chatbot + " chưa được tạo chủ đề, hãy tạo chủ đề cho chatbot ở Quản lý chatbot -> Danh sách chatbot -> Chỉnh sửa";
      typeMess= "error";
    }
    return (
      <PageHeaderWrapper
        title={
          <Alert
            message={alertMess}
            type={typeMess}
            showIcon
            closable
          />
        }
      >
        <div className={styles.normal}>
          <Timeline>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Timeline.Item color="red">
                <Card
                  size="small"
                  bordered={false}
                  title={<div className={styles.timelineTitle}>Chatbot và chủ đề</div>}
                >
                  <Row>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                      <Form.Item label="Chọn Chatbot">
                        <Select
                          style={{ width: '100%' }}
                          showSearch
                          // suffixIcon={<Icon type="android" theme="filled" />}
                          // placeholder="Chọn chatbot"
                          optionFilterProp="children"
                          onChange={this.handleChange}
                          loading={loadingChatbots}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {_.get(chatbots, 'chatbots', [])
                            .map((chatbot, index) => {
                            // console.log(chatbot_name);
                            const TenChatbot = _.get(chatbot, 'TenChatbot', '');
                            return (
                              <Option key={index} value={TenChatbot}>
                                {TenChatbot}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                      <Form.Item label="Chọn Topic">
                        <Select
                          style={{ width: '100%' }}
                          showSearch
                          // suffixIcon={<Icon type="android" theme="filled" />}
                          // placeholder="Chọn Topic"
                          optionFilterProp="children"
                          onChange={this.handleChangeTopic}
                          loading={loadingTopics}
                          value={topic}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {_.get(chatbots, 'topics', []).map((topic, index) => {
                              const TenTopic = _.get(topic, 'TenTopic', '');
                              return (
                                <Option key={index} value={TenTopic}>
                                  {TenTopic}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Timeline.Item>
              <Timeline.Item color="red">
                <Card
                  size="small"
                  bordered={false}
                  title={<div className={styles.timelineTitle}>Câu hỏi</div>}
                >
                  <Suspense fallback={<PageLoading />}>
                    <EditableTable onSaveQA={this.handleSaveQA}/>
                  </Suspense>
                </Card>
              </Timeline.Item>
              <Timeline.Item color="green">
                <Card
                  size="small"
                  bordered={false}
                  title={<div className={styles.timelineTitle}>Câu trả lời</div>}
                >
                  <Form.Item className={styles.flexbox}>
                    {getFieldDecorator('answer', {
                      rules: [
                        {
                          required: true,
                          message: 'Nhập câu trả lời',
                        },
                      ],
                    })(<Input placeholder="Câu trả lời.." />)}
                  </Form.Item>
                </Card>
              </Timeline.Item>
              <Timeline.Item>
                <Card
                  size="small"
                  bordered={false}
                  title={<div className={styles.timelineTitle}>Gần đây</div>}
                >
                  <Form.Item wrapperCol={{ xs: 24 }}>
                    <Suspense fallback={<PageLoading />}>
                      <RecentlyAIMLTable />
                    </Suspense>
                  </Form.Item>
                </Card>
              </Timeline.Item>
              <Timeline.Item dot={<Icon type="file-done" style={{ fontSize: '24px' }} />}>
                <Card
                  size="small"
                  bordered={false}
                  title={<div className={styles.timelineTitle}>Hoàn thành</div>}
                >
                  <div className={styles.flexbox}>
                    <Button disabled={disabledButton} htmlType="submit" type="primary" shape="round" icon="save" size={'large'}>
                      Lưu
                    </Button>
                  </div>
                </Card>
              </Timeline.Item>
            </Form>
          </Timeline>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create({ name: 'CustomQuestion' })(CustomQuestion);
