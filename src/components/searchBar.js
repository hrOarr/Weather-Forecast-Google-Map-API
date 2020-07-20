import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchText: this.props.details.city,
		}
	}

	handleInputChange = (event) => {
		this.setState({ searchText: event.target.value });
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.props.handleSearchBar(this.state.searchText);
		this.setState({ searchText: '' });
	}

	render(){
		return (
			<header>
			 <div className="row" style={{ fontSize: '15px' }}>
                  <div className="col-md-4">Latitude: {this.props.details.latitude.toFixed(4)}</div>
                  <div className="col-md-4">Longitude: {this.props.details.longitude.toFixed(4)}</div>
                  <div className="col-md-4">Address: {this.props.details.address}</div>
                </div>
                <div className="row">
                 <div className="col-md-12">
                   <form onSubmit={this.handleFormSubmit}>
                     <input
                       type='text'
                       id='city_search'
                       placeholder={this.props.details.city}
                       value={this.state.searchText}
                       onChange={this.handleInputChange}
                    />
                   <button type='submit'>Submit</button>
                  </form>
                </div>
                </div>
               </header>
		);
	}
};

export default SearchBar;