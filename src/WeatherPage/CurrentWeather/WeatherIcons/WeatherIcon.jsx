import { Cloud } from "./Cloud"
import { PartlyCloudy } from "./PartlyCloudy"
import { Storm } from "./Storm"
import { Rain } from "./Rain"
import { Sun } from "./Sun"
import React from 'react';

export const WeatherIcon = (props) => {
    const iconHashMap = {
        Clouds: <Cloud />,
        PartlyCloudy: <PartlyCloudy />,
        Rain: <Rain />,
        Storm: <Storm />,
        Clear: <Sun />,
    };

    return (
        iconHashMap[props.name] || <></>
    )
}