import { useContext, useEffect, useState } from "react";
import { commodity_list } from "../../assets/data";
import FoodItem from "../../components/Commodity/FoodItem";
import { AppContext } from "../../context/StoreContext";
import FoodItemPrice from "../../components/Commodity/FoodItemPrice";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {RotatingLines} from 'react-loader-spinner';

const Update = () => {

  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [error, setError] = useState(null);
  const { activeFood, foodMapping, serverUrl} = useContext(AppContext);

  // Add commodity form values
  const [cForm, setCForm] = useState({
    productName: '',
    productType: ''
  });

  // Handling overlay form input changes - Add product form
  const cHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCForm((prev) => {
      return {...prev, [name]: value};
    });
  };

  // Handling overlay submit - Adding of commodity 
  const handleCSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resp = await axios.post(`${serverUrl}/api/commodity/upsert`, {name: cForm.productName, type: cForm.productType});
    if (resp.data.success) {
      toast.success(resp.data.message);
      setShowOverlay(false);
      setCForm({
        productName: '',
        productType: ''
      });
      setLoading(false);
    } else {
      toast.error(resp.data.message);
      console.log(resp.message);
      setLoading(false);
    };
  };

  // Load admin board
  const loadAdminBoard = async () => {
    const resp = await axios.get(`${serverUrl}/api/admin`);
    if (resp.data.success == false) {
      setError(resp.data.message);
    } else {
      toast.success('Access granted');
    };
  };

  // Executes on page render
  useEffect(() => {
    loadAdminBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {showOverlay && <form onSubmit={handleCSubmit} className="overlay p-4 fixed w-[40rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[20rem] m-auto flex flex-wrap gap-[2rem] items-center justify-center bg-[#000000cc]">

        <div onClick={() => setShowOverlay(false)} className="absolute top-[1rem] text-white text-xl cursor-pointer hover:text-gray-300 duration-300 right-[1rem]">x</div>

        <div className="flex flex-col items-start">
          <label htmlFor="product-name" className="text-white">Product Name</label>
          <input
            id="product-namename"
            className=" max-w-[187px] h-[48px] text-gray-800 rounded-[6px] border border-[#828282] text-[12px] leading-[18px] placeholder:text-[#c6c6c6] font-medium px-[1rem]"
            type="text"
            placeholder='eg. Rice'
            name = 'productName'
            value={cForm.productName}
            onChange={cHandleChange}
            required
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="product-type" className="text-white">Product Type</label>
          <input
            id="product-type"
            className=" max-w-[187px] h-[48px] text-gray-800 rounded-[6px] border border-[#828282] placeholder:text-[#c6c6c6] text-[12px] leading-[18px] font-medium px-[1rem]"
            type="text"
            placeholder='eg. Grains'
            name='productType'
            value={cForm.productType}
            onChange={cHandleChange}
            required
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <button type='submit' className={`w-[30%] bg-[#006630] h-[60px] px-6 py-4 text-white rounded-r-[4px] text-sm md:text-[15px] font-medium hover:bg-[#01401f] focus:outline focus:outline-green-500 duration-500 flex items-center justify-center ${loading ? 'bg-[#276100ce]' : ''}`}>
              {
                loading ?
                <RotatingLines
                  visible={true}
                  height="36"
                  width="36"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                : 
                "Add Product"
              }
            </button>
        </div>
      </form>}
      <div onClick={() => setShowOverlay(true)} className="fixed animate-bounce w-[3rem] h-[3rem] rounded-full flex items-center justify-center bg-gray-200 border border-gray-400 text-green-600 font-bold text-xl bottom-[2rem] cursor-pointer right-[2rem]">+</div>
    </div>
  );
};

export default Update;
