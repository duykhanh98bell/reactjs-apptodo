import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: '',
      name: '',
      status: false,
    };
  }
  closeForm = () => {
    this.props.onCloseForm();
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === 'status') {
      value = value === 'true' ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.closeForm();
  };
  onClear = () => {
    this.setState({
      name: '',
      status: false,
    });
  };
  componentDidMount() {
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
      });
    } else if (!nextProps.taskEditing) {
      this.setState({
        id: '',
        name: '',
        status: false,
      });
    }
  }
  render() {
    var { id } = this.state;
    return (
      <div className='panel panel-danger'>
        <div className='panel-heading'>
          <h3 className='panel-title'>
            {id !== '' ? 'Sửa công việc' : 'Thêm công việc'}
            <span
              className='fas fa-times-circle text-right light'
              onClick={this.closeForm}
            ></span>
          </h3>
        </div>
        <div className='panel-body'>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Tên</label>
              <input
                type='text'
                className='form-control'
                name='name'
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <div className='form-group'>
              <label>Trạng thái</label>
              <select
                name='status'
                onChange={this.onChange}
                className='form-control'
                value={this.state.status}
              >
                <option value={false}>Ẩn</option>
                <option value={true}>Kích hoạt</option>
              </select>
            </div>

            <div className='text-center'>
              <button type='submit' className='btn btn-primary mr-10'>
                <span className='fa fa-plus mr-10'></span>Lưu
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={this.onClear}
              >
                <span className='fa fa-trash mr-10'></span>Xóa
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
