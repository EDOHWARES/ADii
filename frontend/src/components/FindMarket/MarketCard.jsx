import { useContext } from 'react';
import { AppContext } from '../../context/StoreContext';
import './MarketCard.css';
import PropTypes from 'prop-types';

const MarketCard = ({img, title, market}) => {

    const {themarket, switchMarket} = useContext(AppContext);

  return (
    <div onClick={() => switchMarket(market)} className='flex flex-col items-center md:items-start gap-[.5rem] mb-[3rem] hover:scale-95 duration-500'>
      <img src={img} alt={title} className={`${market == themarket ? 'border-black' : ''} border-[4px] border-transparent duration-200 rounded-[10px] cursor-pointer`} />
      <h4 className='text-[14px] md:text-[24px] font-medium text-[#3F3F3F] underline'>{title}</h4>
    </div>
  )
};

MarketCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  market: PropTypes.string,
}

export default MarketCard
