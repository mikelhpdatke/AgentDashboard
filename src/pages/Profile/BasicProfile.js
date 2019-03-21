import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Tiến trình',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="Success" />
      ) : (
        <Badge status="processing" text="Processing" />
      ),
  },
  {
    title: 'Operator ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Chi phí',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'profile/fetchBasic',
      payload: params.id || '1000000000',
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: 'Mã Barcode',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Số lượng',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper title="Thông tin cơ bản" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="Chương trình hoàn trả" style={{ marginBottom: 32 }}>
            <Description term="Chọn ID">{application.id}</Description>
            <Description term="Trạng thái">{application.status}</Description>
            <Description term="Số order">{application.orderNo}</Description>
            <Description term="Số order con">{application.childOrderNo}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="Thông tin người dùng" style={{ marginBottom: 32 }}>
            <Description term="Tên">{userInfo.name}</Description>
            <Description term="Số điện thoại">{userInfo.tel}</Description>
            <Description term="Delivery">{userInfo.delivery}</Description>
            <Description term="Địa chỉ">{userInfo.addr}</Description>
            <Description term="Bình luận">{userInfo.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Tiêu đề</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>Tiến độ</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
