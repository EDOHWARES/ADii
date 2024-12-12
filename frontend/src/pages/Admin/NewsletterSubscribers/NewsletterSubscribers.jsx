import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/StoreContext";
import { MutatingDots } from "react-loader-spinner";
import { MdMenu } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";

const NewsletterSubscribers = () => {
  const { serverUrl } = useContext(AppContext);
  const [showNav, setShowNav] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        // const response = await axios.get(`http://localhost:3003/api/email`);
        const response = await axios.get(`${serverUrl}/api/email`);
        if (response.data.success) {
          setSubscribers(response.data.subscribers);
        } else {
          setError("Failed to fetch subscribers");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, []);

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
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="w-full p-6">
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

                  <Link
                    to={'/admin/newsletter-subscribers'}
                    className="border-2 w-full p-2 cursor-pointer duration-300"
                  >
                    Newsletter Subscribers
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
          <div className="overflow-x-scroll mt-10">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-700">
                  <th className="p-3 border-b">No</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Subscribed Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber._id}
                    className="text-gray-700 text-sm text-left hover:bg-gray-100 duration-500"
                  >
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{subscriber.email}</td>
                    <td className="p-3 border-b">{"not available"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsletterSubscribers;
