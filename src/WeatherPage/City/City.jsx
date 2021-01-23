import React from 'react';
import { getCityState } from '../redux/selectors';
import './city.css';
import { connect } from 'react-redux';
import { GeoIcon } from './GeoIcon';
import { setCity, setCityNameByLatLng } from '../redux/actions';
import 'react-autocomplete-input/dist/bundle.css';

export function renderCityTitles(state, val) {
    return (
        state.title.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
}

const City = (props) => {
    const [city, setCity] = React.useState(props.cityState.name);
    const [isChangeCity, setIsChangeCity] = React.useState(false);
    const node = React.useRef();

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);

        return () => document.addEventListener('mousedown', handleClick, false);
    }, [props.cityState.name])

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        }
        setIsChangeCity(false);
    }

    const handleOkClick = () => {
        props.setCity(city);
        setIsChangeCity(false);
    }

    const handleMyLocationClick = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            props.setCityNameByLatLng(position.coords.latitude, position.coords.longitude)
        });
        
    }
    return (
        <div className="city" ref={node} >
            {isChangeCity ?
                <div className="autocomplete">
                    <input 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                handleOkClick();
                            }
                        }}
                    />
                    <div
                        onClick={handleOkClick}
                    >OK</div>
                </div>
                :
                <>

                    <div className="city-text">
                        {props.cityState.name}
                    </div>

                    <div className="change-city-wrapper">
                        <div className="change-city-block"
                            onClick={() => setIsChangeCity(true)}
                        >
                            Сменить город
                        </div>



                        <div className="geo-block" onClick={() => handleMyLocationClick()}>
                            <GeoIcon />
                             Мое местоположение
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

const mapStateToProps = state => {
    const cityState = getCityState(state);
    return { cityState };
};


export default connect(mapStateToProps, { setCity, setCityNameByLatLng })(City);