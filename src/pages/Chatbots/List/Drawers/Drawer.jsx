import React, { Suspense } from 'react';
import { Form, Icon, Button, Select, Drawer, Steps, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './Drawer.less';
import Result from '@/components/Result';
import PageLoading from '@/components/PageLoading';

const { Option } = Select;
const { Step } = Steps;

const DefaultQuestion = React.lazy(() => import('../DefaultQuestion'));
const Info = React.lazy(() => import('../Info'));

// const AutoCompleteOption = AutoComplete.Option;

@connect(({ drawerList, loading }) => ({
  drawerList,
}))
class DrawerComponent extends React.Component {
  increase = () => {
    this.props.dispatch({
      type: 'drawerList/increaseCurrent',
    })
  }

  reset = () => {
    this.props.dispatch({
      type: 'drawerList/resetCurrent',
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { current } = this.state;
    const { drawerList, dispatch } = this.props;
    const { current } = drawerList;
    // console.log(current,'??');
    const steps = [
      {
        title: 'Nhập thông tin cơ bản',
        content: (
          <Suspense fallback={<PageLoading />}>
            <Info increaseCurrent={this.increase} />
          </Suspense>
        ),
      },
      {
        title: 'Nhập câu chào',
        content: (
          <Suspense fallback={<PageLoading />}>
            <DefaultQuestion increaseCurrent={this.increase} />
          </Suspense>
        ),
      },
      {
        title: 'Hoàn thành',
        content: (
          <Result
            type="success"
            title={
              <div style={{ background: '#7dbcea', color: '#fff' }}>Bạn đã điền xong thông tin</div>
            }
            extra="Hãy nhập thêm câu hỏi cá nhân cho Chatbot của bạn để giúp Chatbot có thể trả lời nhiều câu hỏi chính xác hơn nhé!"
          />
        ),
      },
    ];
    // console.log(current,'??');
    const drawerWidth = window.innerWidth > 760 ? '60vw' : '90vw';
    return (
      <Drawer
        title="Tạo Chatbot mới"
        width={drawerWidth}
        onClose={() => {
          this.reset();
          this.props.dispatch({ type: 'drawerList/handle', payload: false });
        }}
        visible={drawerList.open}
        style={{
          overflow: 'auto',
          height: '100%',
          // paddingBottom: '108px',
        }}
      >
        <Steps current={current} className={styles.steps}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>{steps[current].content}</div>
        <div>
          {/* {current < steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              onClick={() => this.setState(state => ({ current: state.current + 1 }))}
              className={styles.nextButton}
            >
              Tiếp tục
              <Icon type="right" />
            </Button>
          )} */}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.nextButton}
              onClick={() => {
                message.success('Thêm chatbot thành công vào danh sách chatbot');
                this.reset();
                this.props.dispatch({
                  type: 'drawerList/handle',
                  payload: false,
                });
              }}
            >
              <Icon type="save" />
              Hoàn thành
            </Button>
          )}
        </div>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'register' })(DrawerComponent);
