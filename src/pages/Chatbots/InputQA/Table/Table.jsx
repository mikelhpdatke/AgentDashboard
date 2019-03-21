/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Table, Input, Button, Popconfirm, Form, Icon, AutoComplete } from 'antd';
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
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    // console.log(e.target)
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      // if (error) {
      //   return;
      // }
      // this.toggleEdit();
      // console.log(values, record);
      let data2Dispatch;
      if (e.target.id === 'textQuestion'){
        // console.log(record);
        data2Dispatch = {
          type: 'AIMLTable/text2Pattern',
          key: record.key,
          question: values.textQuestion,
        }
        // console.log(values.textQuestion,'thisss');
      }
      handleSave({ ...record, ...values }, data2Dispatch);
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, index, 
      handleSave, hint, ...restProps } = this.props;
    // console.log(hint, '///', record, title, dataIndex);
    // console.log();
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(
                    <AutoComplete
                      dataSource={( dataIndex !== 'textQuestion' && hint && hint.get(record.key) ) ? 
                      [hint.get(record.key)] || [] : []}
                    >
                      <Input
                        id={dataIndex}
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    </AutoComplete>
                  )}
                </FormItem>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

@connect(({chatbots, AIMLTable, loading}) => ({
  AIMLTable,
  chatbots,
  loading: loading.models.AIMLTable,
}))
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Câu hỏi đầy đủ',
        dataIndex: 'textQuestion',
        width: '45%',
        editable: true,
      },
      {
        title: 'Câu hỏi thu gọn',
        dataIndex: 'textAIML',
        width: '45%',
        editable: true,
      },
      {
        title: 'Tuỳ chọn',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Bạn có chắc muốn xoá ?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="javascript:;">Xoá</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      textQuestion: '',
      textAIML: '',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row, data2Dispatch) => {
    if (data2Dispatch){
      this.props.dispatch(data2Dispatch);
    }
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData }, () => {
      this.props.onSaveQA(this.state.dataSource);
    });
  };

  render() {
    const { dataSource } = this.state;
    const { dispatch, AIMLTable, chatbots } = this.props;
    // console.log(AIMLTable.hint);
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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          hint: AIMLTable.hint,
          handleSave: this.handleSave,
        }),
      };
    });
    // console.log(chatbots)
    // console.log(chatbots.topic == '');
    return (
      <div>
        <Button disabled={chatbots.chatbot == '' || chatbots.topic == ''} onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          <Icon type="plus" />
          Thêm câu hỏi
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
