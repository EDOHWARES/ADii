import React, { useContext, useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { GiSettingsKnobs } from "react-icons/gi";
// import { farmersData } from "../../assets/data";
import axios from "axios";
import { AppContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const FarmersList = () => {
  const { serverUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch initial data
  useEffect(() => {
    setLoading(true);
    async function fetchFarmers() {
      const resp = await axios.get(`${serverUrl}/api/farmer/`);
      if (resp.data.success) {
        setFarmers(resp.data.farmers);
        setLoading(false)
      } else {
        toast.error(resp.data.message);
        setLoading(false);
      }
    }
    fetchFarmers();
  }, []);

  // Filter Farmers based on location, crops, farmName.
  const filteredFarmers = searchTerm
    ? farmers.filter((farmer) => {
        return (
          farmer.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
          farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          farmer.farmName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : farmers;

  return (
    <div className="flex flex-col items-center gap-[5rem] justify-center w-full md:px-10 px-4">
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center justify-start w-full p-2 pr-16 gap-4 h-[57px] max-w-[605px] rounded-[5px] border border-[#CFCFCF] bg-[#F7F7F7] ">
          <RiSearch2Line className="text-[#25212F] text-[26px]" />
          <input
            className="bg-transparent h-full w-full text-[15px] placeholder:text-[15px] text-[#818181] border border-transparent border-r-gray-300 outline-none"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by state, crops, farm name..."
          />
          <GiSettingsKnobs className="text-2xl text-[#25212F]" />
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <h2 className="text-[16px] text-[#2F2F2F] font-[600] mb-4">
          Farmer List
        </h2>
        {filteredFarmers.length == 0 ? (
          <div className=" w-full text-center text-gray-700">Farm data not available</div>
        ) : (
          loading ? 
          <div className=" w-full text-center text-gray-700">Loading</div>
          :
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="w-full">
              <tr className="w-full text-[10px] md:text-[14px] text-[#535765] bg-gray-100 ">
                <th className="font-semibold py-5">No</th>
                <th className="font-semibold py-5">Location</th>
                <th className="font-semibold py-5">Farmer Name</th>
                <th className="font-semibold py-5">Crops</th>
                <th className="font-semibold py-5">Contact</th>
                <th className="font-semibold py-5">Farm Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer, index) => (
                <tr
                  key={farmer._id}
                  className="text-[#40434E] text-[10px] md:text-[16px] text-center hover:bg-gray-100 duration-500"
                >
                  <td className="p-3 py-5 border-b">{index + 1}</td>
                  <td className="p-3 py-5 border-b">{farmer.location}</td>
                  <td className="p-3 py-5 border-b">{farmer.farmerName}</td>
                  <td className="p-3 py-5 border-b">{farmer.crop}</td>
                  <td className="p-3 py-5 border-b">{farmer.contact}</td>
                  <td className="p-3 py-5 border-b">{farmer.farmName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FarmersList;
