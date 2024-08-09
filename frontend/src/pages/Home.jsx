import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Texts from '../components/Texts/Texts'
import Newsletter from '../components/Newsletter/Newsletter'
import FindMarket from '../components/FindMarket/FindMarket'
import Footer from '../components/Footer/Footer'
import Commodity from '../components/Commodity/Commodity';
import { useContext } from 'react';
import { AppContext } from '../context/StoreContext'
import Petroleum from '../components/Petroleum/Petroleum'
import Rainfall from '../components/Rainfall/Rainfall'

const Home = () => {

    const {themarket} = useContext(AppContext);

  return (
    <div>
      <Header />
      <Hero />
      <Texts />
      <Newsletter />
      <FindMarket />
      {themarket == 'foods' ? <Commodity /> : themarket == 'petroleum' ? <Petroleum /> :  <Rainfall /> }
      <Footer />
    </div>
  )
}

export default Home
