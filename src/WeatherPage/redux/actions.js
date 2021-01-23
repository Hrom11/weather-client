import axios from 'axios';
import {CHANGE_TEMP_UNITS, SET_WEATHER, SET_CITY} from './actionTypes';

export const changeTempUnits = unitsState => {
    return {
        type: CHANGE_TEMP_UNITS,
        payload: {unitsState},
    };
}

export const setCityNameByLatLng = (lat, lng) => {
    return async (dispatch) => {

        const link = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${process.env.REACT_APP_MAP_API_KEY}`
        // uncomment next link to test via another loc
        // const linkWithBerlinCoords = `http://api.openweathermap.org/geo/1.0/reverse?lat=52.520008&lon=13.404954&limit=1&appid=${process.env.REACT_APP_MAP_API_KEY}`
        const response = await axios.get(link);
        
        if (response.status !== 200) {
            // TODO error
            return;
        }

        const data = response.data[0];
        const cityName = data.local_names.ru ? data.local_names.ru : data.name;

        dispatch(setCity(cityName))
    }
}

export const setCity = city => {
    return {
        type: SET_CITY,
        payload: {city},
    }
}

export const getWeather = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const units =  state.weather.unitsState.c ? 'metric' : 'imperial'
        const cityName = state.weather.cityState.name
       
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_MAP_API_KEY}&lang=RU&units=${units}`)

        if (response.status !== 200) {
            return;
        }

        const {data} = response;

        const weather = {
            temp: Math.floor(data.main.temp),
            description: data.weather[0].description,
            weatherType: data.weather[0].main,
            statistic: {
                wind: data.wind.speed,
                pressure: data.main.pressure,
                humidity: data.main.humidity, 
            }
        }


        dispatch(setWeather(weather));
    }
}

export const setWeather = (weatherState) => {
    return {
        type: SET_WEATHER,
        payload: {weatherState},
    };
}