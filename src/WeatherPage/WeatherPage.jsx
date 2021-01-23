import React from 'react';
import SwitchWeather from './SwitchWeather/SwitchWeather';
import City from './City/City';
import './weatherPage.css';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import Statistic from './Statictic/Statistc';
import {connect} from 'react-redux';
import {getWeather} from './redux/actions';
import { getUnitsState, getWeatherState, getCityState } from './redux/selectors';


const WeatherPage = (props) => {

    React.useEffect(() => {
        props.onGetWeather();
    }, [props.cityState.name, props.unitsState])

    const weatherState = props.weatherState;
    return (
        <div className="weather">
            <div className="weather-head">
                <City />
                <div>
                    <SwitchWeather />
                </div>
            </div>
            <div>
                <CurrentWeather 
                    temperature={weatherState.temp} 
                    weatherType={weatherState.weatherType} 
                    description={weatherState.description}/>
            </div>
            <div>
                <Statistic />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const weatherState = getWeatherState(state);
    const unitsState = getUnitsState(state);
    const cityState = getCityState(state);
    return {weatherState, unitsState, cityState}
}

const mapDispatchToProps = dispatch => {
    return {
      onGetWeather: () => {
        dispatch(getWeather());
      }
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);