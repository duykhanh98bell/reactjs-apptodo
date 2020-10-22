import React, { Component } from 'react';

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  };
  render() {
    var { sortBy, sortValue } = this.props;
    return (
      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
        <div className='dropdown'>
          <button
            type='button'
            className='btn btn-danger dropdown-toggle'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          >
            Sắp xếp
            <span className='far fa-caret-square-down  pl-10'></span>
          </button>
          <ul className='dropdown-menu '>
            <li onClick={() => this.onClick('name', 1)}>
              <p
                className={
                  sortBy === 'name' && sortValue === 1
                    ? 'dropdown-item light ml-10 sort_selected'
                    : 'dropdown-item light ml-10'
                }
              >
                <span className='fas fa-sort-alpha-up pr-10'></span>
                A-Z
              </p>
            </li>
            <li onClick={() => this.onClick('name', -1)}>
              <p
                className={
                  sortBy === 'name' && sortValue === -1
                    ? 'dropdown-item light ml-10 sort_selected'
                    : 'dropdown-item light ml-10'
                }
              >
                <span className='fas fa-sort-alpha-up-alt pr-10'></span>
                Z-A
              </p>
            </li>
            <li onClick={() => this.onClick('status', 1)}>
              <p
                className={
                  sortBy === 'status' && sortValue === 1
                    ? 'dropdown-item light ml-10 sort_selected'
                    : 'dropdown-item light ml-10'
                }
              >
                <span className='fas fa-sort-alpha-up-alt pr-10'></span>
                Kích hoạt
              </p>
            </li>
            <li onClick={() => this.onClick('status', -1)}>
              <p
                className={
                  sortBy === 'status' && sortValue === -1
                    ? 'dropdown-item light ml-10 sort_selected'
                    : 'dropdown-item light ml-10'
                }
              >
                <span className='fas fa-sort-alpha-up-alt pr-10'></span>
                Ẩn
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
