import React, { Component } from 'react';

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keyword: '',
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };
  render() {
    var { keyword } = this.state;
    return (
      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
        <div className='input-group '>
          <input
            name='keyword'
            type='text'
            className='form-control'
            value={keyword}
            onChange={this.onChange}
          />
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-success'
              onClick={this.onSearch}
            >
              <i className='fas fa-search mr-10'></i>Go!
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
