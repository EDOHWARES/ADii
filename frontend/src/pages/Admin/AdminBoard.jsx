import React, { useContext, useEffect, useState } from "react";
import { commodity_list } from "../../assets/data";
import FoodItem from "../../components/Commodity/FoodItem";
import { AppContext } from "../../context/StoreContext";
import FoodItemPrice from "../../components/Commodity/FoodItemPrice";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import axios from 'axios';
import {} from 'react-router-dom';
import { toast } from "react-toastify";

const AdminBoard = () => {

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
    <div className="flex flex-col gap-[4rem] py-6 w-[1165px] mx-auto">
      <div className="w-full flex items-center justify-between font-semibold text-[16px] text-[#393939]">
        <MdMenu className="cursor-pointer" />
        <p>Product Update</p>
        <MdCancelPresentation className="cursor-pointer" />
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
            <button className="w-full h-[51px] rounded-[5px] py-[4px] px-[10px] bg-[#1B1B1B] text-white font-semibold text-[14px]">Update</button>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;
