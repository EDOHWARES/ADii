import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines, MutatingDots } from "react-loader-spinner";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { AppContext } from "../../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const FarmerData = () => {
  const {serverUrl} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const [farmers, setFarmers] = useState([]);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    farmerName: "",
    crop: "",
    contact: "",
    farmName: "",
  });

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`${serverUrl}/api/farmer/`);
      if (resp.data.success) {
        setFarmers(resp.data.farmers)
        toast.success('Farm data fetched')
      } else {
        toast.error(resp.data.message)
      };
    }
    fetchData();
  }, []);

  const handleEdit = async (farmer) => {
    setEditingFarmer(farmer);
    setFormData(farmer);
  };

  const handleDelete = async (id) => {
    const resp = await axios.delete(`${serverUrl}/api/farmer/${id}/`);
    if (resp.data.success) {
      toast.success(resp.data.message);
      setFarmers((prev) => prev.filter((farmer) => farmer._id !== id));
    } else {
      toast.success(resp.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingFarmer) {
      // const updatedFarmer = await updateFarmer(editingFarmer._id, formData);
      let updatedFarmer = await axios.put(`${serverUrl}/api/farmer/${formData._id}`, {
        farmerName: formData.farmerName,
        location: formData.location,
        crop: formData.crop,
        contact: formData.contact,
        farmName: formData.farmName
      })
      updatedFarmer = updatedFarmer.data.farmer;
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer._id === updatedFarmer._id ? updatedFarmer : farmer
        )
      );
    } else {
      const resp = await axios.post(`${serverUrl}/api/farmer/`, {
        farmerName: formData.farmerName,
        location: formData.location,
        crop: formData.crop,
        contact: formData.contact,
        farmName: formData.farmName,
      });
      setFarmers((prev) => [...prev, resp.data.farmer]);
      
    }
    setFormData({
      location: "",
      farmerName: "",
      crop: "",
      contact: "",
      farmName: "",
    });
    setEditingFarmer(null);
  };

  // Logout Admin Board
  const logout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      window.location.reload();
    }
  };

  return (
    <section className="w-full">
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
        <div className="md:flex flex-col gap-[4rem] px-[1rem] md:px-[3rem] py-6 w-full mx-auto">
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
                    to={"/admin/products"}
                    className="border-2 w-full p-2 cursor-pointer duration-300"
                  >
                    Products Update
                  </Link>

                  <Link
                    to={"/admin/farmers-data"}
                    className="border-2 w-full p-2 cursor-pointer duration-300"
                  >
                    Farmers Data
                  </Link>
                </div>
              )}
            </div>
            <p>Farmers Data</p>
            <MdCancelPresentation
              onClick={logout}
              className="cursor-pointer text-2xl"
            />
          </div>

          <div className="mt-10 w-full">
            <form
              onSubmit={handleSubmit}
              className="mb-6 p-4 bg-gray-100 rounded shadow w-full"
            >
              <h3 className="text-xl font-semibold mb-4">
                {editingFarmer ? "Edit Farmer" : "Add Farmer"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Farmer Name"
                  value={formData.farmerName}
                  onChange={(e) =>
                    setFormData({ ...formData, farmerName: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Crops"
                  value={formData.crop}
                  onChange={(e) =>
                    setFormData({ ...formData, crop: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Farm Name"
                  value={formData.farmName}
                  onChange={(e) =>
                    setFormData({ ...formData, farmName: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              >
                {editingFarmer ? "Update Farmer" : "Add Farmer"}
              </button>
            </form>

            <div className="w-full overflow-x-scroll">
              <table className="min-w-full bg-white border border-gray-200 overflow-x-scroll">
                <thead>
                <tr className="w-full text-[10px] md:text-[14px] text-[#535765] bg-gray-100 ">
                <th className="p-3 border-b">No</th>
                    <th className="p-3 border-b">Location</th>
                    <th className="p-3 border-b">Farmer Name</th>
                    <th className="p-3 border-b">Crops</th>
                    <th className="p-3 border-b">Contact</th>
                    <th className="p-3 border-b">Farm Name</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((farmer, index) => (
                    <tr
                      key={farmer._id}
                      className="text-[#40434E] text-[10px] md:text-[16px] text-center hover:bg-gray-100 duration-500"
                      >
                      <td className="p-3 border-b text-center">{index + 1}</td>
                      <td className="p-3 border-b">{farmer.location}</td>
                      <td className="p-3 border-b">{farmer.farmerName}</td>
                      <td className="p-3 border-b">{farmer.crop}</td>
                      <td className="p-3 border-b">{farmer.contact}</td>
                      <td className="p-3 border-b">{farmer.farmName}</td>
                      <td className="p-3 border-b flex space-x-2">
                        <button
                          onClick={() => handleEdit(farmer)}
                          className="px-2 py-1 bg-blue-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(farmer._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FarmerData;
