import React from 'react';
import { WeatherIcon } from './WeatherIcons/WeatherIcon';
import { connect } from 'react-redux';
import './currentWeather.css';
import { getUnitsState } from '../redux/selectors';

const CurrentWeather = (props) => {
    return (
        <div className="weather-wrapper">
            <div className="current-weather">
                <WeatherIcon name={props.weatherType} />
                {props.temperature}  {props.unitsState.c ? '°' : '°F'}
            </div>
            <div className="weather-description">
                {props.description}
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    const unitsState = getUnitsState(state);
    return { unitsState };
};

export default connect(mapStateToProps)(CurrentWeather);