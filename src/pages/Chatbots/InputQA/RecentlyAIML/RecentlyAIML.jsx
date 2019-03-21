import { Table, Typography } from 'antd';
import { connect } from 'dva';
import React from 'react';
import styles from './RecentlyAIML.less';

const { Text } = Typography;

const columns = [
  {
    title: 'Pattern',
    dataIndex: 'aiml',
  },
  {
    title: 'Template',
    dataIndex: 'answer',
  },
];

@connect(({ recentlyAIML, loading }) => ({
  recentlyAIML,
  loading: loading.models.recentlyAIML,
}))
class RecentlyAIMLTable extends React.Component {
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  render() {
    const { recentlyAIML } = this.props;
    // console.log(recentlyAIML);
    const { data } = recentlyAIML;
    // newData for table
    // data recieve: 
        // CauHoiAIML: ["^ xin ^ chao ^"]
        // CauHoiDayDu: ["xin chao"]
        // CauTraLoi: "hi ban"
        // NguoiTao: "admin"
    const newData = [];
    data.map( val => {
      val.CauHoiAIML.map(aiml => newData.push({ aiml, answer: val.CauTraLoi}));
    })
    return (
      // <div className={styles.root}>
      <Table bordered columns={columns} dataSource={newData} onChange={this.onChange} />
      // </div>
    );
  }
}
export default RecentlyAIMLTable;
