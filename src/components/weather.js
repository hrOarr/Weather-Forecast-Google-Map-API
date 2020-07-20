import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import WeatherNow from './weatherNow';
import WeatherDaily from './weatherDaily';

const API_KEY = "******************";

class Weather extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			JSON: ''
		}
	}

	componentWillMount(){
		this.getWeather();
	}

	getWeather = () => {
		const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+this.props.details.latitude+'&lon='+this.props.details.longitude+'&exclude=hourly&appid='+API_KEY;
		axios.get(WEATHER_URL)
		.then(response => {
			console.log(response.data);
			this.setState({ loading: false, JSON: response.data });
		})
		.catch(error => {
			console.log("Error from getWeather!!");
		});
	}

	render(){
		return (
			<div className="container" style={{ paddingTop: '20px', backgroundColor: '#3389DB', color: 'white' }}>
                  <div style={{ textAlign: 'center', fontSize: '38px', paddingBottom: '20px' }}><span style={{ fontSize: '21px' }}>City: </span>{this.props.details.city}</div>
                  <div className="row" style={{ paddingBottom: '20px' }}>
                    <div className="col-md-6" style={{ fontSize: '28px' }}>
                       <WeatherNow JSON={this.state.JSON}/>
                    </div>
                    <div className="col-md-6" style={{ fontSize: '28px' }}>
                      <div>Forecast(4 days)</div>
                      <hr />
                      <div className="row">
                      <div className="col-md-6">
                      <WeatherDaily JSON={this.state.JSON} id={0} />
                      <WeatherDaily JSON={this.state.JSON} id={1} />
                      </div>
                      <div className="col-md-6">
                      <WeatherDaily JSON={this.state.JSON} id={2} />
                      <WeatherDaily JSON={this.state.JSON} id={3} />
                      </div>
                      </div>
                    </div>
                   </div>
			</div>
		);
	}

};

export default Weather;