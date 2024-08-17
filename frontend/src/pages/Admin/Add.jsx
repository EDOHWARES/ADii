import { useState } from "react";
import { MdMenu, MdCancelPresentation } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Product = ({ title, placeholder }) => {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="">{title}</label>
      <input
        className=" max-w-[187px] h-[48px] rounded-[6px] border border-[#828282] text-[12px] leading-[18px] text-[#c6c6c6] font-medium px-[1rem]"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

Product.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
};

const Add = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className="w-[1165px] mx-auto mt-6 flex items-center justify-between font-semibold text-[16px] text-[#393939]">
        <div
          onClick={() => setShowNav((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <MdMenu
            className={`cursor-pointer border-2 text-2xl border-transparent ${
              showNav ? "border-gray-600" : ""
            }`}
          />
          {showNav && (
            <div className="absolute top-[1.6rem] bg-[#f1f1f1] border-2 shadow-2xl w-[13rem] flex flex-col items-center justify-center text-sm font-medium text-gray-500">
              <Link
                to={"/admin"}
                className="border-2 w-full p-2 cursor-pointer hover:bg-white duration-300"
              >
                Update Products
              </Link>
              <Link
                to={"/admin/add"}
                className="border-2 w-full p-2 cursor-pointer bg-white duration-300"
              >
                Add Products
              </Link>
            </div>
          )}
        </div>
        <p>Add Product</p>
        <MdCancelPresentation className="cursor-pointer text-2xl" />
      </div>
      <div className="w-[1165px] mx-auto flex items-center justify-center min-h-screen">
        <div className="content">
          <form className="flex flex-col items-center justify-center gap-[5rem]">
            <div className="grid grid-cols-4 gap-[2rem]">
              <Product title="Product Name" placeholder={"e.g Rice"} />
              <Product title={"Product Type"} placeholder={"e.g Grains"} />
              <Product title={"Product Price"} placeholder={"e.g ₦450000"} />
              <Product title={"State"} placeholder={"e.g Kaduna"} />
            </div>
            <button className="w-full h-[51px] rounded-[5px] py-[4px] px-[10px] bg-[#1B1B1B] text-white font-semibold text-[14px] hover:bg-[#2f2f2f] duration-500">
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
