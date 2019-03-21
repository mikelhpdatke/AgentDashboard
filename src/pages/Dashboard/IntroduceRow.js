import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip, Card } from 'antd';
// import { FormattedMessage } from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
// import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Lượt truy cập"
        action={
          <Tooltip title="Chi tiết">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="Hôm nay" value={numeral(1214).format('0,0')} />}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Số câu hỏi"
        action={
          <Tooltip title="Chi tiết">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => 126560}
        footer={<Field label="Hôm nay" value={`${numeral(12423).format('0,0')}`} />}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          Thay đổi theo tuần
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          Thay đổi hôm nay
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Số chủ đề"
        action={
          <Tooltip title="Chi tiết">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(65).format('0,0')}
        footer={<Field label="Hôm nay" value={5} />}
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    {/* <Col {...topColResponsiveProps}>

    </Col> */}
  </Row>
));

export default IntroduceRow;
