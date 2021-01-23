import { connect } from "react-redux"
import { getWeatherState } from "../redux/selectors";
import './statistic.css';

const statisticHashmap = {
    wind: 'Ветер',
    pressure: 'Давление',
    humidity: 'Влажность',
    probabilityOfPrecipitation: 'Вероятность дождя',
}

const statisticUnitsHashmap = {
    wind: 'м/с',
    pressure: 'мм рт. ст.',
    humidity: '%',
    probabilityOfPrecipitation: '%',
};


const Statistic = (props) => {

    if (!props.weatherState.statistic) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <div className="statistic">
            {Object.keys(props.weatherState.statistic).map((item, index) => {
                const title = statisticHashmap[item];
                const value = props.weatherState.statistic[item];
                const unitsDescr = statisticUnitsHashmap[item];
                return (
                    <StatisticItem 
                        key={index}
                        title={title}
                        value={value}
                        unitsDescr={unitsDescr}
                    />
                )
            })}

                <StatisticItem 
                        key={100}
                        title={statisticHashmap.probabilityOfPrecipitation}
                        value={50}
                        unitsDescr={statisticUnitsHashmap.probabilityOfPrecipitation}
                    />
        </div>
    )
}


const StatisticItem = ({key, title, value, unitsDescr}) => {
    return (
        <div key={`statistic_item-${key}`} className="statistic-item">
        {title}
        <div className="statistic-item-description">
            {value} {unitsDescr}
        </div>
    </div>
    )

}

const mapStateToProps = state => {
    const weatherState = getWeatherState(state);
    return {weatherState};
}

export default connect(mapStateToProps)(Statistic);