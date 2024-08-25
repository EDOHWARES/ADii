import { useContext, useEffect, useState } from "react";
import FoodItem from "../../components/Commodity/FoodItem";
import { AppContext } from "../../context/StoreContext";
import FoodItemPrice from "../../components/Commodity/FoodItemPrice";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines, MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Update = () => {

  const { serverUrl } = useContext(AppContext);
  const [commodity_list, setCommodity_list] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [activeCommodity, setActiveCommodity] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [prices, setPrices] = useState({
    Abia: "",
    Adamawa: "",
    AkwaIbom: "",
    Anambra: "",
    Bauchi: "",
    Bayelsa: "",
    Benue: "",
    Borno: "",
    CrossRiver: "",
    Delta: "",
    Ebonyi: "",
    Edo: "",
    Ekiti: "",
    Enugu: "",
    Gombe: "",
    Imo: "",
    Jigawa: "",
    Kaduna: "",
    Kano: "",
    Katsina: "",
    Kebbi: "",
    Kogi: "",
    Kwara: "",
    Lagos: "",
    Nasarawa: "",
    Niger: "",
    Ogun: "",
    Ondo: "",
    Osun: "",
    Oyo: "",
    Plateau: "",
    Rivers: "",
    Sokoto: "",
    Taraba: "",
    Yobe: "",
    Zamfara: "",
    FCT: "",
  });

  const handlePriceInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setPrices((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle Update
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
  
    try {
      // Check if all prices are empty
      let empty = 0;
      for (const state in prices) {
        if (prices[state].length < 2) {
          empty += 1;
        }
      }
  
      if (empty === Object.keys(prices).length) {
        toast.error("You can't send an empty update to the database.");
        return;
      }
  
      // Make the API call to update the commodity prices
      const resp = await axios.post(`${serverUrl}/api/admin/update`, {
        commodityName: activeCommodity,
        updatedPrices: prices,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Accept': 'application/json',
        },
      });
  
      if (resp.data.success) {
        await loadCommodities();  // Reload commodities after a successful update
        for (const state in prices) {
          prices[state] = "";  // Reset the prices for all states
        }
        toast.success(resp.data.message);
      } else {
        toast.error(resp.data.message || 'Failed to update commodity prices.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Your session has expired. Please log in again.");
          localStorage.removeItem('adminToken');
          // Optionally redirect to login
        } else {
          toast.error(error.response.data.message || 'An error occurred while updating commodity prices.');
        }
      } else if (error.request) {
        toast.error('No response received from the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setUpdating(false);  // Stop the updating indicator
    }
  };
  

  const clearCommodities = async () => {
    if (confirm("Are you sure you want to delete all commodities?")) {
      setLoading(true);
  
      try {
        const resp = await axios.post(`${serverUrl}/api/admin/clear-commodity`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Accept': 'application/json',
          },
        });
  
        if (resp.data.success) {
          await loadCommodities();  // Reload commodities after successful deletion
          toast.success(resp.data.message);
        } else {
          toast.error(resp.data.message || 'Failed to clear commodities.');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("Your session has expired. Please log in again.");
            localStorage.removeItem('adminToken');
            // Optionally redirect to login
          } else {
            toast.error(error.response.data.message || 'An error occurred while clearing commodities.');
          }
        } else if (error.request) {
          toast.error('No response received from the server. Please try again later.');
        } else {
          toast.error('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);  // Stop the loading indicator
      }
    }
  };
  

  // Handle Commodity name switch
  const switchCommidity = (e) => {
    setActiveCommodity(e.target.textContent);
  };

  // Handle Commodity delete
  const handleDelete = async (e) => {
    const activeCommodity = e.target.previousElementSibling.textContent;
  
    if (confirm(`Are you sure you want to delete ${activeCommodity}?`)) {
      try {
        const resp = await axios.post(`${serverUrl}/api/admin/delete-commodity`, 
        { name: activeCommodity }, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Accept': 'application/json',
          },
        });
  
        if (resp.data.success) {
          await loadCommodities();  // Reload commodities after successful deletion
          toast.success(resp.data.message);
        } else {
          toast.error(resp.data.message || `Failed to delete ${activeCommodity}.`);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("Your session has expired. Please log in again.");
            localStorage.removeItem('adminToken');
            // Optionally redirect to login
          } else {
            toast.error(error.response.data.message || `An error occurred while deleting ${activeCommodity}.`);
          }
        } else if (error.request) {
          toast.error('No response received from the server. Please try again later.');
        } else {
          toast.error('An unexpected error occurred.');
        }
      }
    }
  };
  

  // Load commodities from db
  const loadCommodities = async () => {
    setLoading(true);
  
    try {
      const resp = await axios.get(`${serverUrl}/api/commodity/fetch`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Accept': 'application/json',
        },
      });
  
      if (resp.data.success && resp.data.commodities.length > 0) {
        setCommodity_list(resp.data.commodities);
        setActiveCommodity(resp.data.commodities[0].name);
      } else {
        setCommodity_list([]);
        toast.error(resp.data.message || 'No commodities found.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Your session has expired. Please log in again.");
          localStorage.removeItem('adminToken');
          // Optionally redirect to login
        } else {
          toast.error(error.response.data.message || 'An error occurred while fetching commodities.');
        }
      } else if (error.request) {
        toast.error('No response received from the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  // Add commodity Form values
  const [cForm, setCForm] = useState({
    productName: "",
    productType: "",
  });

  // Handling overlay form input changes - Add product form
  const cHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handling overlay submit - Adding of commodity
  const handleCSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const resp = await axios.post(`${serverUrl}/api/admin/upsert`, {
        name: cForm.productName,
        type: cForm.productType,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Accept': 'application/json',
        },
      });
  
      if (resp.data.success) {
        await loadCommodities();  // Reload commodities after a successful operation
        toast.success(resp.data.message);
        setShowOverlay(false);  // Close the overlay
        setCForm({
          productName: "",
          productType: "",
        });  // Reset the form fields
      } else {
        toast.error(resp.data.message || 'Failed to update commodity.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Your session has expired. Please log in again.");
          localStorage.removeItem('adminToken');
          // Optionally redirect to login
        } else {
          toast.error(error.response.data.message || 'An error occurred while updating the commodity.');
        }
      } else if (error.request) {
        toast.error('No response received from the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);  // Stop the loading indicator
    }
  };
  

  // Load admin board
  const loadAdminBoard = async () => {
    try {
      const resp = await axios.get(`${serverUrl}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Accept': 'application/json',
        },
      });
    
      if (resp.data.success) {
        toast.success("Access granted!");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Your session has expired. Please log in again.");
          localStorage.removeItem('adminToken');
          // Optionally redirect to login
        } else {
          toast.error(error.response.data.message || 'An error occurred while accessing the admin dashboard.');
        }
      } else if (error.request) {
        toast.error('No response received from the server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  // Logout Admin Board
  const logout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      window.location.reload();
    };
  };
  
  

  // Executes on page render
  const navigate = useNavigate();
  
  useEffect(() => {
    const initialize = async () => {
      await loadAdminBoard();
      if (localStorage.getItem('adminToken')) {
        loadCommodities();
        setActiveCommodity();
      } else {
        navigate('/admin/auth');
      }
    };
    initialize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      {loading ? (
        <div className="fixed h-screen flex flex-col gap-[1.5rem] items-center justify-center w-full mx-auto">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Wait! while we process your request</p>
        </div>
      ) : (
        <div className="md:flex flex-col gap-[4rem] py-6 w-[1165px] mx-auto">
          <div className="w-full flex items-center justify-between font-semibold text-[16px] text-[#393939]">
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
                    to={"/"}
                    className="border-2 w-full p-2 cursor-pointer hover:bg-white duration-300"
                  >
                    Home Page
                  </Link>
                  <Link
                    onClick={clearCommodities}
                    className="border-2 w-full p-2 cursor-pointer bg-red-300 text-white duration-300"
                  >
                    Clear All Commodity
                  </Link>
                </div>
              )}
            </div>
            <p>Product Update</p>
            <MdCancelPresentation onClick={logout} className="cursor-pointer text-2xl" />
          </div>
          {!commodity_list.length > 0 ? (
            <div>
              <p>No available commodity, pls add!</p>
            </div>
          ) : (
            <div className="border w-full border-[#DEDEDE] h-fit mx-auto rounded-[4px]">
              <div className="top h-[73px] bg-[#F1F1F1] flex items-center font-semibold text-[15px] text-[#555555] px-4">
                <span className="w-[30%]">All Products</span>
                <span className="w-[70%] flex items-center justify-center">
                  {/* {activeCommodity.charAt(0).toUpperCase() + activeCommodity.slice(1)} */}
                  {activeCommodity}
                </span>
              </div>
              <div className="bottom flex items-start gap-[4rem]">
                <div className="left flex flex-col w-[30%] border-r">
                  {commodity_list.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="text-gray-300 hover:text-gray-500 relative"
                      >
                        <FoodItem
                          admin={true}
                          handleDelete={handleDelete}
                          activeCommodity={activeCommodity}
                          switchActiveCommodity={switchCommidity}
                          name={item.name}
                        />
                        <div 
                        onClick={handleDelete}
                        className="absolute top-0 right-[4px] cursor-pointer">x</div>
                      </div>
                    );
                  })}
                </div>
                <form
                  onSubmit={handleFormUpdate}
                  className="flex flex-col items-center w-full"
                >
                  <div className="right w-full grid grid-cols-3 gap-[2rem] py-[1rem]">
                    {commodity_list.map((commodity) => {
                      if (commodity["name"] == activeCommodity) {
                        return Object.entries(commodity.price[0]).map(
                          ([state, price], index) => {
                            const entries = Object.entries(commodity.price[0]);
                            const isLastElement = index === entries.length - 1;
                            if (isLastElement) {
                              return null;
                            }

                            return (
                              <FoodItemPrice
                                key={index}
                                state={state}
                                onChange={handlePriceInputChange}
                                price={price}
                                value={prices[state]}
                                name={state}
                                admin={true}
                              />
                            );
                          }
                        );
                      }
                    })}
                  </div>

                  <div className="update w-[100%] float-right mt-[3rem]">
                    <button
                      type="submit"
                      className="w-full h-[51px] rounded-[5px] py-[4px] px-[10px] bg-[#1B1B1B] text-white font-semibold text-[14px] hover:bg-[#2f2f2f]"
                    >
                      {updating
                        ? `Updating ${activeCommodity}...`
                        : `Update ${activeCommodity}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {showOverlay && (
            <form
              onSubmit={handleCSubmit}
              className="overlay p-4 fixed w-[40rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[20rem] m-auto flex flex-wrap gap-[2rem] items-center justify-center bg-[#000000cc]"
            >
              <div
                onClick={() => setShowOverlay(false)}
                className="absolute top-[1rem] text-white text-xl cursor-pointer hover:text-gray-300 duration-300 right-[1rem]"
              >
                x
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="product-name" className="text-white">
                  Product Name
                </label>
                <input
                  id="product-namename"
                  className=" max-w-[187px] h-[48px] text-gray-800 rounded-[6px] border border-[#828282] text-[12px] leading-[18px] placeholder:text-[#c6c6c6] font-medium px-[1rem]"
                  type="text"
                  placeholder="eg. Rice"
                  name="productName"
                  value={cForm.productName}
                  onChange={cHandleChange}
                  required
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="product-type" className="text-white">
                  Product Type
                </label>
                <input
                  id="product-type"
                  className=" max-w-[187px] h-[48px] text-gray-800 rounded-[6px] border border-[#828282] placeholder:text-[#c6c6c6] text-[12px] leading-[18px] font-medium px-[1rem]"
                  type="text"
                  placeholder="eg. Grains"
                  name="productType"
                  value={cForm.productType}
                  onChange={cHandleChange}
                  required
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className={`w-[30%] bg-[#006630] h-[60px] px-6 py-4 text-white rounded-r-[4px] text-sm md:text-[15px] font-medium hover:bg-[#01401f] focus:outline focus:outline-green-500 duration-500 flex items-center justify-center ${
                    loading ? "bg-[#276100ce]" : ""
                  }`}
                >
                  {loading ? (
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
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          )}
          <div
            onClick={() => setShowOverlay(true)}
            className="fixed animate-bounce w-[3rem] h-[3rem] rounded-full flex items-center justify-center bg-gray-200 border border-gray-400 text-green-600 font-bold text-xl bottom-[2rem] cursor-pointer right-[2rem]"
          >
            +
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
