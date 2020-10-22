import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import SearchSort from './Components/Search-Sort';
import Table from './Components/Table';
import _ from 'lodash';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1,
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1,
    };
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks,
      });
    }
  }

  // tao id
  Mid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateId() {
    return (
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid() +
      this.Mid()
    );
  }
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing === null) {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null,
    });
  };
  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };
  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '' && data.name !== '') {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  onToggleStatus = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.map((task, index) => {
      if (task.id === id) {
        result = index;
      }
      return result;
    });
    return result;
  };
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  };
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  };
  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: +filterStatus,
      },
    });
  };
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };
  onSort = async (sortBy, sortValue) => {
    await this.setState({
      sortBy,
      sortValue,
    });
  };
  render() {
    var {
      tasks,
      isDisplayForm,
      taskEditing,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state;

    if (filter) {
      if (filter.name) {
        // tasks = tasks.filter((task) => {
        //   return task.name.toLowerCase().indexOf(filter.name) !== -1;
        // });
        tasks = _.filter(tasks, (task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    console.log(sortBy, sortValue);
    if (sortBy === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      });
    }

    var elmTaskForm =
      isDisplayForm === true ? (
        <TaskForm
          onSubmit={this.onSubmit}
          onCloseForm={this.onCloseForm}
          taskEditing={taskEditing}
        />
      ) : (
        ''
      );

    return (
      <div>
        <div className='container'>
          <div className='row midle'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <div className=''>
                <h1>QUAN LY CONG VIEC</h1>
              </div>
            </div>
          </div>

          <div className='row'>
            <div
              className={
                isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''
              }
            >
              {elmTaskForm}
            </div>

            <div
              className={
                isDisplayForm
                  ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                  : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
              }
            >
              <button
                type='button'
                className='btn btn-primary mr-10'
                onClick={this.onToggleForm}
              >
                <span className='fa fa-plus mr-10'></span>
                Thêm công việc
              </button>

              <SearchSort
                onSearch={this.onSearch}
                onSort={this.onSort}
                sortBy={this.state.sortBy}
                sortValue={this.state.sortValue}
              ></SearchSort>
              <Table
                tasks={tasks}
                onToggleStatus={this.onToggleStatus}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
