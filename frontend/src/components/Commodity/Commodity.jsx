import FoodItem from "./FoodItem";
// import {commodity_list} from '../../assets/data';
import FoodItemPrice from "./FoodItemPrice";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/StoreContext";
import axios from "axios";

const Commodity = () => {

    const {serverUrl} = useContext(AppContext);
    
    const [loading, setLoading] = useState(false);
    const [commodity_list, setCommodity_list] = useState([]);
    const [activeCommodity, setActiveCommodity] = useState('Melon');

    const switchCommidity = (e) => {
      setActiveCommodity(e.target.textContent);
    }

    const loadCommodities = async () => {
      setLoading(true);

      const resp = await axios.get(`${serverUrl}/api/commodity/fetch`);

      if (resp.data.success) {
          setCommodity_list(resp.data.commodities);
          setLoading(false);
      } else {
          console.log(resp.data.message);
      };
  };

  useEffect(() => {
    loadCommodities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className=" px-4 md:px-10 duration-500">
      <div className="content rounded-[4px] border border-[#DEDEDE]">
        <div className="up flex p-4 h-[73px bg-[#F1F1F1] text-[#555555] text-[15px] font-semibold justify-between">
            <div className="w-[25%] hidden md:flex items-center justify-start">
                <span className="w-[3.5rem]">S/N</span>
                <span className="">All Commodities</span>
            </div>
          <span className="w-full md:w-[75%] flex items-center justify-center">{activeCommodity.charAt(0).toUpperCase()+activeCommodity.slice(1)}</span>
        </div>

        {loading? 
        <div>
          <h1 className="text-2xl text-red-700">Loading</h1>
        </div>
        :
        <div className="down flex items-start gap-[1rem] md:gap-[4rem] pr-[1rem]">
          <div className="left w-[30%] h-full flex flex-col border-r">
            {
                commodity_list.map((item, index) => {
                    return (
                        <FoodItem 
                            key={index}
                            activeCommodity={activeCommodity}
                            switchActiveCommodity={switchCommidity}
                            id={item.id}
                            numbering={true}
                            name={item.name}
                        />
                    )
                })
            }
          </div>
          <div className="right w-[80%] grid grid-cols-2 md:grid-cols-3 gap-[1rem] md:gap-[2rem] py-[1rem]">
            {
              commodity_list.map((commodity) => {
                if (commodity.name == activeCommodity) {
                  return Object.entries(commodity.price[0]).map(([state, price], index) => {
                    const entries = Object.entries(commodity.price[0]);
                    const isLastElement = index === entries.length - 1;
                    if (isLastElement) {
                      return null;
                    };

                    return (
                      <FoodItemPrice 
                        key={index}
                        state={state}
                        price={price}
                        admin={false}
                      />
                    )
                  })
                }
              })
            }
          </div>
        </div>}
      </div>
    </section>
  );
};

export default Commodity;
