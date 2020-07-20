import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import SearchBar from './components/searchBar';
import Map from './components/Map';
import Weather from './components/weather';

const API_KEY_GOOGLE = '1cabb8f6613140d3b450a6a5c0776286';

function AsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      latitude: null,
      longitude: null,
      city: '',
      address: ''
    }
  }

  componentWillMount(){
    // AsyncCall().then(() => this.setState({ loading: false }));
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.reverseGeoCoding(position.coords.latitude, position.coords.longitude);
      },
      err => {
        console.log("ERROR(${err.code}): ${err.message}");
        this.getIP();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  getIP = () => {
    const IP_URL_HOME = "https://ipapi.co/json/";
    const json = axios.get(IP_URL_HOME);
    this.setState({
      latitude: json.data.latitude,
      longitude: json.data.longitude,
      city: json.data.city,
      address: json.data.city,
      loading: false
    });
  }

  reverseGeoCoding = (lat, long) => {
    const GEO_URL_HOME = "https://api.opencagedata.com/geocode/v1/json?key="+API_KEY_GOOGLE+"&q="+lat+","+long;
    console.log(GEO_URL_HOME)
    axios.get(GEO_URL_HOME)
    .then(json => {
      console.log(json);
      this.setState({
      latitude: lat,
      longitude: long,
      city: json.data.results[0].components.city,
      address: json.data.results[0].formatted,
      loading: false
    });
    })
    .catch(error => {
      console.log(error);
      console.log("Error comes from reverseGeoCoding!");
    });

  }

  handleSearch = (name) => {
    const GEO_URL_HOME = "https://api.opencagedata.com/geocode/v1/json?key="+API_KEY_GOOGLE+"&q="+name;
    this.setState({ city: 'loading...' });

    axios.get(GEO_URL_HOME)
    .then(json => {
      console.log(json);
      this.setState({
      latitude: json.data.results[0].geometry.lat,
      longitude: json.data.results[0].geometry.lng,
      city: json.data.results[0].formatted,
      address: json.data.results[0].formatted,
      loading: false
    });
    })
    .catch(error => {
      console.log(error);
      console.log("Error comes from handleSearch!");
    });
  }

  handleMapClick = (event) => {
    this.reverseGeoCoding(event.latLng.lat(), event.latLng.lng());
  };

  render(){
    return (
      <div>
        {
          !this.state.loading?
          <div className="container">
            <SearchBar handleSearchBar={this.handleSearch} details={this.state} />

            <Weather details={this.state} />

            <Map
             handleMapClick={this.handleMapClick}
             handleAddressSearch={this.handleAddressSearch}
             details={this.state}
            />
          </div>
          :
          <h2>App is loading........</h2>
        }
      </div>
    );
  }
};

export default App;
