import React, { useContext, useEffect, useState } from "react";
import { commodity_list } from "../../assets/data";
import FoodItem from "../../components/Commodity/FoodItem";
import { AppContext } from "../../context/StoreContext";
import FoodItemPrice from "../../components/Commodity/FoodItemPrice";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Update = () => {

  const [showNav, setShowNav] = useState(false);
  const [error, setError] = useState(null);
  const { activeFood, foodMapping, serverUrl} = useContext(AppContext);

  const loadAdminBoard = async () => {
    const resp = await axios.get(`${serverUrl}/api/admin`);
    if (resp.data.success == false) {
      setError(resp.data.message);
    } else {
      toast.success('Access granted');
    };
  };


  useEffect(() => {
    loadAdminBoard();
  }, []);


  if (error) {
    return (
      <div className="w-screen bg-white h-screen flex items-center justify-center text-red-600 text-[1.5rem]">
        {error}
      </div>
    )
  }

  return (
    <div className="md:flex flex-col gap-[4rem] py-6 w-[1165px] mx-auto">
      <div className="w-full flex items-center justify-between font-semibold text-[16px] text-[#393939]">
        <div onClick={() => setShowNav(prev => !prev)} className="relative cursor-pointer">
          <MdMenu className={`cursor-pointer border-2 text-2xl border-transparent ${showNav ? 'border-gray-600' : ''}`} />
          {showNav && <div className="absolute top-[1.6rem] bg-[#f1f1f1] border-2 shadow-2xl w-[13rem] flex flex-col items-center justify-center text-sm font-medium text-gray-500">
            <Link to={'/admin'} className="border-2 w-full p-2 cursor-pointer bg-white duration-300">Update Products</Link>
            <Link to={'/admin/add'} className="border-2 w-full p-2 cursor-pointer hover:bg-white duration-300">Add Products</Link>
          </div>}
        </div>
        <p>Product Update</p>
        <MdCancelPresentation className="cursor-pointer text-2xl" />
      </div>
      <div className="border w-full border-[#DEDEDE] h-fit mx-auto rounded-[4px]">
        <div className="top h-[73px] bg-[#F1F1F1] flex items-center font-semibold text-[15px] text-[#555555] px-4">
          <span className="w-[30%]">All Products</span>
          <span className="w-[70%] flex items-center justify-center">
            {activeFood.charAt(0).toUpperCase() + activeFood.slice(1)}
          </span>
        </div>
        <div className="bottom flex items-start gap-[4rem]">
          <div className="left flex flex-col w-[30%] border-r">
            {commodity_list.map((item, index) => {
              return <FoodItem key={index} name={item.name} type={item.type} />;
            })}
          </div>
          <div className="right w-[70%] grid grid-cols-3 gap-[2rem] py-[1rem]">
            {Object.entries(
              commodity_list[foodMapping[activeFood]].price[0]
            ).map(([state, price], index) => (
              <FoodItemPrice key={index} state={state} price={price} admin={true} />
            ))}
          </div>
        </div>
        <div className="update w-[70%] float-right mt-[3rem]">
            <button className="w-full h-[51px] rounded-[5px] py-[4px] px-[10px] bg-[#1B1B1B] text-white font-semibold text-[14px] hover:bg-[#2f2f2f]">Update</button>
        </div>
      </div>
    </div>
  );
};

export default Update;
