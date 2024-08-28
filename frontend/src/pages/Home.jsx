import { useEffect } from 'react'
import FindMarket from '../components/FindMarket/FindMarket';
import Commodity from '../components/Commodity/Commodity';
import { useContext } from 'react';
import { AppContext } from '../context/StoreContext';
import Petroleum from '../components/Petroleum/Petroleum';
import Rainfall from '../components/Rainfall/Rainfall';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const {themarket, token} = useContext(AppContext);

    useEffect(() => {
      if (!token) {
        navigate('/auth')
      }
    }, [token, navigate]);

  return (
    <div>
      <FindMarket />
      {themarket == 'foods' ? <Commodity /> : themarket == 'petroleum' ? <Petroleum /> :  <Rainfall /> }
    </div>
  )
}

export default Home
