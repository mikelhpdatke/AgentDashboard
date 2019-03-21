import React, { memo } from 'react';
import { Card, Tabs, Row, Col, Typography } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { TimelineChart, Pie } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';

const { Title } = Typography;

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle={
          <FormattedMessage id="app.analysis.conversion-rate" defaultMessage="Conversion Rate" />
        }
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name && 'light'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36 }}>
      <Pie
        animate={false}
        color={currentKey !== data.name && '#BDE4FF'}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.cvr * 100}
        height={64}
      />
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const OfflineData = memo(
  ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => (
    <Card
      loading={loading}
      className={styles.offlineCard}
      bordered={false}
      style={{ marginTop: 0 }}
      title="Thống kế lượt truy cập"
    >
      <div style={{ padding: '0 24px' }}>
        <TimelineChart
          height={400}
          data={offlineChartData}
          titleMap={{
            y1: 'Theo tuần',
            y2: 'Theo tháng',
          }}
        />
      </div>
    </Card>
  )
);

export default OfflineData;
