import { createContext, useEffect, useState, } from "react";
import PropTypes from 'prop-types';

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {

    const [token, setToken] = useState('');
    const [signedUp, setSignedUp] = useState(true);
    const serverUrl = process.env.REACT_APP_API_URL;
    const [themarket, setMarket] = useState('foods');
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