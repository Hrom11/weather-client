export const initialState = {
    unitsState: {
        c: true,
        f: false,
    },
    cityState: {name: 'Омск'},
    weatherState: {},
};

export default function weatherReducer(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_TEMP_UNITS': {
            const unitsState = action.payload;
            return {
                ...state,
                ...unitsState,
            }
        }
        case 'SET_WEATHER': {
            const weatherState = action.payload;
            
            return {
                ...state,
                ...weatherState,
            };
        }
        case 'SET_CITY': {
            const cityName = action.payload.city;

            return {
                ...state,
                cityState: {
                    ...state.cityState,
                    name: cityName,
                },
            }
        }
        default: {
            return state;
        }
    }
}