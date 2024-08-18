import PropTypes from 'prop-types';


const FoodItemPrice = ({ state, price, admin }) => {

  return (
    <div className="flex flex-col gap-[.5rem]">
      <h3 className="font-medium text-[13px] leading-[19.5px] text-[#8A8A8A]">
        {state}
      </h3>
      {admin == true ? (
        <input
          type="text"
          placeholder={`${price}`}
          required
          className=" max-w-[187px] h-[48px] rounded-[6px] border border-[#828282] text-[12px] leading-[18px] text-[#c6c6c6] font-medium px-[1rem]"
        />
      ) : (
        <input
          type="text"
          value={`₦ ${price}`}
          readOnly
          className=" max-w-[187px] h-[48px] rounded-[6px] border border-[#828282] text-[12px] leading-[18px] text-[#c6c6c6] font-medium px-[1rem]"
        />
      )}
    </div>
  );
};

FoodItemPrice.propTypes = {
  state: PropTypes.string,
  price: PropTypes.string,
  admin: PropTypes.bool,
};

export default FoodItemPrice;
