import React from "react";
import FoodItem from "./FoodItem";
import {commodity_list} from '../../assets/data';
import FoodItemPrice from "./FoodItemPrice";
import { useContext } from "react";
import { AppContext } from "../../context/StoreContext";

const Commodity = () => {

    const {activeFood, foodMapping} = useContext(AppContext);
    
  return (
    <section className="px-10">
      <div className="content rounded-[4px] border border-[#DEDEDE]">
        <div className="up flex p-4 h-[73px bg-[#F1F1F1] text-[#555555] text-[15px] font-semibold justify-between">
            <div className="w-[25%] flex items-center justify-start">
                <span className="w-[3.5rem]">S/N</span>
                <span className="">All Commodities</span>
            </div>
          <span className="w-[75%] flex items-center justify-center">{activeFood.charAt(0).toUpperCase()+activeFood.slice(1)}</span>
        </div>
        <div className="down flex items-start gap-[4rem]">
          <div className="left w-[30%] flex flex-col border-r">
            {
                commodity_list.map((item, index) => {
                    return (
                        <FoodItem 
                            key={index}
                            id={item.id}
                            name={item.name}
                        />
                    )
                })
            }
          </div>
          <div className="right w-[80%] grid grid-cols-3 gap-[2rem] py-[1rem]">
            {
                    Object.entries(commodity_list[foodMapping[activeFood]].price[0]).map(([state, price], index) => (
                            <FoodItemPrice 
                                key={index}
                                state={state}
                                price={price}
                            />
                    ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commodity;
