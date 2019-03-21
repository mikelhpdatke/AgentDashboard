import { Form, Input, Icon, Button, Avatar, Row, Col, Card } from 'antd';
import styles from './DefaultQuestion.less';
// import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
let id = 0;

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class DefaultQuestion extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        router.push('/inputQA');
      }
    });
  };

  componentDidMount() {
    // console.log('DefaultQuestion mound.');
    // console.log(this.props.form);
    this.add();
    this.add();
  }
  render() {
    // console.log('DefaultQuestion render..');
    const { currentUser, currentUserLoading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
      },
    };
    const labelLayout = {
      xs: { span: 12 },
      md: { span: 3 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    // console.log(keys);
    const formItems = keys.map((k, index) => (
      <Col span={12} key={index}>
        <Form.Item
          style={{ width: '100%' }}
          {...formItemLayout}
          label={''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: index === 0 ? 'Xin chào' : index === 1 ? 'Chào bạn' : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Nhập câu chào',
              },
            ],
          })(<Input placeholder="Câu chào mẫu" style={{ width: '80%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      </Col>
    ));
    const headerContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            Hi,
            {' ' + currentUser.name + ' '}
            hãy nhập câu chào cho tôi nhé！
          </div>
          <div>
            {currentUser.title} |{currentUser.group}
          </div>
        </div>
      </div>
    );
    return (
      <PageHeaderWrapper
        // title={'Các câu chào cho chatbot'}
        content={headerContent}
      >
        <div className={styles.normal}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24} offset={0}>
                <Card title={'Câu chào'} className={styles.customCard}>
                  <Row gutter={48}>{formItems}</Row>
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button size="small" type="primary" onClick={this.add}>
                      <Icon type="plus" /> Thêm câu hỏi
                    </Button>
                  </Form.Item>
                </Card>
              </Col>
              <Col span={24} offset={0}>
                {/* // */}
                <Card title={'Câu trả lời'}>
                  <Form.Item
                    style={{ width: '100%' }}
                    {...formItemLayout}
                    label={''}
                    required={false}
                    key={'answer'}
                  >
                    {getFieldDecorator(`answer`, {
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: 'Nhập câu trả lời',
                        },
                      ],
                    })(
                      <Input placeholder="Câu trả lời" style={{ width: '100%', marginRight: 8 }} />
                    )}
                  </Form.Item>
                </Card>
                {/* // */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className={styles.nextButton}
                  >
                    Tiếp tục
                    <Icon type="right" />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create({ name: 'DefaultQuestion' })(DefaultQuestion);
