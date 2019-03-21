import { Table, Input, Popconfirm, Form, Button } from 'antd';
import styles from 'Modify.less';
import { connect } from 'dva';
import _ from 'lodash';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

  getInput = () => {
    // let currentTopicValue = _.get(this.props.record, 'topic', '');
    // console.log(this.props.record,'??', this.props.inputType === 'disabled', currentTopicValue === '');
    // currentTopicVal === '' && inputType === 'disabled
    return <Input disabled={this.props.dataIndex === 'topic'} />;
  };

  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
    // console.log(editing,'/???');
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex || 'init', {
                    rules: [
                      {
                        required: true,
                        message: `Please Input ${title}!`,
                      },
                    ],
                    initialValue: _.get(record, [dataIndex], ''),
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

@connect(({ SecondDrawer, loading }) => ({
  SecondDrawer,
  loading: loading.models.SecondDrawer,
}))
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data,
      visible: false ,
      editingKey: '',
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      count: 20,
    };
    this.columns = [
      {
        title: 'Tên chủ đề',
        dataIndex: 'topic',
        width: '15%',
        editable: true,
      },
      {
        title: 'Nội dung',
        dataIndex: 'content',
        width: '35%',
        editable: true,
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        width: '35%',
        editable: true,
      },
      {
        title: 'Tuỳ chọn',
        width: '15%',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          // console.log(editable,'////');
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Lưu
                      </a>
                    )}
                  </EditableContext.Consumer>
                  {/* <Popconfirm
                    title="Bạn muốn huỷ thay đổi?"
                    cancelText="Không"
                    okText="Huỷ"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Huỷ</a>
                  </Popconfirm> */}
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Sửa</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  toRealData = SecondDrawer => {
    return _.get(SecondDrawer, 'topics', []).map((data, index) => ({
      key: index.toString(),
      topic: data.TenTopic,
      content: data.NoiDung,
      note: data.GhiChu,
    }));
  };

  handleAdd = () => {
    const { SecondDrawer, dispatch } = this.props;
    const { topics, chatbot } = SecondDrawer;
    topics.unshift({
      TenChatbot: chatbot,
      TenTopic: '',
      NoiDung: '',
      GhiChu: '',
    });
    dispatch({
      type: 'SecondDrawer/saveTopics',
      payload: topics,
    });
  };

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const { SecondDrawer } = this.props;
    // console.log(SecondDrawer);
    const data = this.toRealData(SecondDrawer);
    // console.log(data);
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'topic' ? 'disabled' : 'input',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
          
        }),
      };
    });
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
    
        <div style={{ marginBottom: 16 }}>
          <Button
            style={{ marginLeft: 8, marginRight: 30 }}
            type="primary"
            onClick={() => this.props.showChildrenDrawer()}
          >
            Thêm mới
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá?"
            cancelText="Huỷ lệnh"
            okText="Xoá"
            onConfirm={() => {
              console.log('??');
            }}
          >
            <Button type="danger" disabled={!hasSelected || loading}>
              Xoá
            </Button>
          </Popconfirm>
          <span style={{ marginLeft: 8, marginRight: 30 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} chủ đề` : ''}
          </span>
        </div>
        <Table
          pagination={{ pageSize: 6 }}
          scroll={{ y: '45vh' }}
          rowSelection={rowSelection}
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          // pagination={{
          //   onChange: this.cancel,
          // }}
        />
      </div>
    );
  }
}

export default EditableTable;
