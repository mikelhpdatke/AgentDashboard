import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import PageLoading from '@/components/PageLoading';

// import DrawerNewChatbot from './Drawer';
const DrawerNewChatbot = React.lazy(() => import('./Drawers/Drawer'));
const DrawerModify = React.lazy(() => import('./Drawers/SecondDrawer'));
@connect(({ list, drawerList, loading }) => ({
  list,
  drawerList,
  loading: loading.models.list || loading.models.SecondDrawer,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list },
      loading,
      drawerList,
    } = this.props;
    console.log('???', list);
    // console.log(drawerList, '??');
    return (
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <DrawerNewChatbot />
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <DrawerModify />
        </Suspense>
        <PageHeaderWrapper>
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={['', ...list]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[
                        <a
                          onClick={() => {
                            router.push('/chatbots/inputQA');
                          }}
                        >
                          Nhập dữ liệu
                        </a>,
                        <a
                          onClick={() => {
                            this.props.dispatch({
                              type: 'SecondDrawer/fetchTopics',
                              payload: {
                                TenChatbot: item.title,
                              },
                            });
                          }}
                        >
                          Chỉnh sửa
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <React.Fragment>
                            <Ellipsis className={styles.item} lines={3}>
                              {item.description}
                              <div>Lĩnh vực: {item.fields}</div>
                            </Ellipsis>
                          </React.Fragment>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button
                      type="dashed"
                      className={styles.newButton}
                      onClick={() => {
                        this.props.dispatch({
                          type: 'drawerList/handle',
                          payload: true,
                        });
                      }}
                    >
                      <Icon type="plus" /> Thêm Chatbot
                    </Button>
                  </List.Item>
                )
              }
            />
          </div>
        </PageHeaderWrapper>
      </React.Fragment>
    );
  }
}

export default CardList;
