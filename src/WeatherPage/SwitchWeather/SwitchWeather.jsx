import React from 'react';
import { connect } from 'react-redux';
import './switchWeather.css';
import { changeTempUnits } from '../redux/actions';
import {initialState} from '../redux/reducers/weather';

const SwitchWeather = (props) => {

    const [active, setActive] = React.useState(initialState.unitsState);
    const onClick = ({ c, f }) => {
        setActive({ c, f });
        props.changeTempUnits({ c, f });
    }

    return (
        <div className="switch-weather-conainer">
            <div className="circle">
                {active.c ? '°' : '°F'}
            </div>
            <div className="switch-weather">
                <div className={`container ${active.c ? `active` : ``}`} onClick={() => onClick({ c: true, f: false })}>
                    C
            </div>
                <div className={`container ${active.f ? `active` : ``}`} onClick={() => onClick({ c: false, f: true })}>
                    F
            </div>
            </div>
        </div>
    )
}

export default connect(null, {changeTempUnits})(SwitchWeather);