import React, { Component } from 'react';
import { getDate } from './helpers';

const currentTime = Math.round(new Date().getTime()/1000);
const timeOptions = {
	weekday: 'short',
	month: 'short',
	day : 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	hour12: true
}

class WeatherNow extends Component {
	constructor(props){
		super(props);
	}

	renderWeather(weatherData){
		if(!weatherData) return null;
		let currentTemp, tempMin, tempMax, time;
		if(Object.keys(weatherData.current)){
			currentTemp = weatherData.current.temp.toFixed(1);
			tempMin = weatherData.daily[0].temp.min.toFixed(1);
			tempMax = weatherData.daily[0].temp.max.toFixed(1);
		}
          
          return (
          <div style={{ textAlign: 'center' }}>
            <div>Current Weather</div>
            <hr />
            <div style={{ fontSize: '20px' }}>{tempMin/10} / {tempMax/10}&deg;{'C'}</div>
		  <div>{currentTemp/10}&deg;{'C'}</div>
		  <div style={{ fontSize: '20px' }}>{getDate(currentTime, timeOptions)}</div>
		</div>
		);

		console.log(weatherData.weather);
	}

	render(){
		return (
			<div>
			  {
			  	this.props.JSON?
			  	this.renderWeather(this.props.JSON)
			  	:
			  	null
			  }
			</div>
		);
	}
};

export default WeatherNow;