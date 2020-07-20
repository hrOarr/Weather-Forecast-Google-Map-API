import React, { Component } from 'react';
import { getDate } from './helpers';

const currentTime = Math.round(new Date().getTime()/1000);
const timeOptions = {
	weekday: 'short',
	month: 'short',
	day : 'numeric',
};

class WeatherDaily extends Component {
	constructor(props){
		super(props);
	}

	render(){

		let time,tempMin,tempMax;
		const weatherData = this.props.JSON;
		const id = this.props.id;

		if(weatherData.daily){
			time = new Date(weatherData.daily[id].dt);
			tempMin = weatherData.daily[id].temp.min;
			tempMax = weatherData.daily[id].temp.max;
		}

		return (
			<div>
			  <div>
			    <div style={{ fontSize: '25px' }}>
			      {getDate(time,timeOptions)}
			    </div>
			    <div style={{ fontSize: '20px' }}>
			      {(tempMin/10).toFixed(1)}&deg;
			      /&nbsp;
			      {(tempMax/10).toFixed(1)}&deg;
			      {'C'}
			    </div>
			  </div>
			</div>
		);
	}
};

export default WeatherDaily;