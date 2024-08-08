import { createContext, useState } from "react";

export const AppContext = createContext('');

const AppContextProvider = (props) => {

    const [themarket, setMarket] = useState('foods');
    const [activeFood, setActiveFood] = useState('maize');
    const foodMapping = {
        maize: 0,
        melon: 1,
        honey: 2,
        ginger: 3,
        pepper: 4,
        rice: 5,
        yam: 6,
        garri: 7,
        beans: 8,
    };

    const switchActiveFood = (food) => {
        setActiveFood(food);
    };

    const switchMarket = (themarket) => {
        setMarket(themarket);
    };

    const contextValue = {
        activeFood,
        themarket,
        foodMapping,
        switchActiveFood,
        switchMarket,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;