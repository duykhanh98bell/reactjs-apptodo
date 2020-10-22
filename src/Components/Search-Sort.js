import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class SearchSort extends Component {
  render() {
    return (
      <div className='row mt-15'>
        <Search onSearch={this.props.onSearch}></Search>
        <Sort
          onSort={this.props.onSort}
          sortBy={this.props.sortBy}
          sortValue={this.props.sortValue}
        ></Sort>
      </div>
    );
  }
}

export default SearchSort;
