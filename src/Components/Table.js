import React, { Component } from 'react';
import TrItem from './TrItem';

class Table extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filterName: '',
      filterStatus: -1,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { tasks } = this.props; // var tasks = this.props.tasks;
    var { filterName, filterStatus } = this.state;
    var elmTasks = tasks.map((task, index) => {
      return (
        <TrItem
          key={task.id}
          index={index}
          task={task}
          onToggleStatus={this.props.onToggleStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        ></TrItem>
      );
    });
    return (
      <div className='row mt-15'>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type='text'
                    name='filterName'
                    className='form-control'
                    value={filterName}
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    name='filterStatus'
                    className='form-control'
                    required='required'
                    value={filterStatus}
                    onChange={this.onChange}
                  >
                    <option value={-1}>Tất cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {elmTasks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
