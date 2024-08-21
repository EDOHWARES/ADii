import PropTypes from 'prop-types';

const FoodItem = ({ name, type, switchActiveCommodity, activeCommodity}) => {

  return (
    <div onClick={switchActiveCommodity} className={`flex border-b ${name == activeCommodity ? 'border-b-[#009A49]' : 'border-b'} h-[3.5rem] hover:bg-gray-200 duration-500 items-center cursor-pointer`}>
      <div className='text-center px-[1rem] md:pl-[2rem] py-2 flex flex-col items-start'>
        <div id='name' className={`font-medium ${name.toLowerCase() == activeCommodity ? 'text-[#009A49]' : 'text-[#444444]'} flex items-center text-sm md:text-[20px]`}>{name}</div>
        <p className='text-[10px] font-normal text-[#8E8E8E]'>{type}</p>
      </div>
    </div>
  )
};

FoodItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  numbering: PropTypes.bool,
  switchActiveCommodity: PropTypes.func,
  activeCommodity: PropTypes.string
}

export default FoodItem
