import React, { Component } from 'react';

class TrItem extends Component {
  onToggleStatus = () => {
    this.props.onToggleStatus(this.props.task.id);
  };
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  };
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.task.name}</td>
        <td className='text-center'>
          <span
            className={
              this.props.task.status
                ? 'label label-success'
                : 'label label-danger'
            }
            onClick={this.onToggleStatus}
          >
            {this.props.task.status === true ? 'Kích hoạt' : 'Ẩn'}
          </span>
        </td>
        <td className='text-center'>
          <button
            type='button'
            className='btn btn-primary mr-10'
            onClick={this.onUpdate}
          >
            <span className='fa fa-pencil mr-10'></span>Sửa
          </button>

          <button
            type='button'
            className='btn btn-danger'
            onClick={this.onDelete}
          >
            <span className='fa fa-trash mr-10'></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TrItem;
