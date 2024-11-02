import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines, MutatingDots } from "react-loader-spinner";
import { MdCancelPresentation } from "react-icons/md";
import { MdMenu } from "react-icons/md";

const FarmerData = () => {
  const [loading, setLoading] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Logout Admin Board
  const logout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      window.location.reload();
    }
  };

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
        </div>
      )}
    </>
  );
};

export default FarmerData;
