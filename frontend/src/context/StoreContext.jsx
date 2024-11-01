import { createContext, useEffect, useState, } from "react";
import PropTypes from 'prop-types';

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {

    const [token, setToken] = useState('');
    const [signedUp, setSignedUp] = useState(true);
    const serverUrl = import.meta.env.VITE_API_URL;
    const [themarket, setMarket] = useState('');
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

    const heroTextMapping = {
        home: ['Agroconomy', 'ADii is a non-profit organization that collects National Data for improved economic activities'],
        foods: ['Food Community', 'News, Prices and analysis on vital part of the agriculture market'],
        petroleum: ['Petroleum', 'Get a true global view of the risk and opportunities ahead for the petroleum market'],
        rainfall: ['Rainfall', 'Get real-time data on rainfall specifics'],
        farmers: ['Farmers', 'Get real time information regarding crops and the farms in each state in nigeria']
    }

    const switchMarket = (themarket) => {
        setMarket(themarket);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            setSignedUp(true);
        };
    }, [token]);

    const contextValue = {
        signedUp,
        setSignedUp,
        token,
        setToken,
        serverUrl,
        themarket,
        foodMapping,
        switchMarket,
        heroTextMapping,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppContextProvider;