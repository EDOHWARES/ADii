import { useContext, useEffect, useState } from "react";
import logo from "../../src/assets/images/logo.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { AppContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Auth = () => {
  const navigate = useNavigate();
  const { serverUrl, token, setToken, signedUp, setSignedUp } =
    useContext(AppContext);
  const [btnLoader, setBtnLoader] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [passwordEmail, setPasswordEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setSnowPassword] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetPassword) {
      let newUrl = serverUrl;
      if (signedUp) {
        newUrl += "/api/user/login";
        const resp = await axios.post(newUrl, formData);
        if (resp.data.success) {
          const token = resp.data.token;
          setToken(token);
          localStorage.setItem("token", token);
          toast.success("Sucessful Login!");
        } else {
          toast.error(resp.data.message);
        }
      } else {
        newUrl += "/api/user/register";
        const resp = await axios.post(newUrl, formData);
        if (resp.data.success) {
          const token = resp.data.success;
          setToken(token);
          localStorage.setItem("token", token);
          toast.success("Successfully Signed Up, Login!");
        } else {
          toast.error(resp.data.message);
        }
      }

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setBtnLoader(true);
      const resp = await axios.post(`${serverUrl}/api/user/send-reset-link`, {
        email: passwordEmail,
      });

      if (resp.data.success) {
        setBtnLoader(false);
        toast.success(resp.data.message);
      } else {
        setBtnLoader(false);
        toast.error(resp.data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="mb-[3rem]">
      <div className="content px-4 md:px-16 w-full flex flex-col gap-[3rem]">
        <div className="head w-full flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[164px] h-[164px]" />
        </div>
        <div className="body">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[2.2rem]">
            <div className="flex flex-col items-start gap-[.4rem]">
              <label className="text-xl text-[#8A8A8A]" htmlFor="userEmail">
                Enter your email
              </label>
              <input
                onChange={
                  !resetPassword
                    ? handleChange
                    : (e) => setPasswordEmail(e.target.value)
                }
                value={!resetPassword ? formData.email : passwordEmail}
                className="w-full h-[48px] border border-[#D7D7D7] outline-none focus:outline-1 focus:border-transparent focus:outline-[#6CBC37] rounded-[6px] text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4"
                placeholder="e.g omitoyinayomide20@gmail.com"
                type="email"
                name="email"
                id="userEmail"
              />
            </div>
            {!resetPassword && (
              <div className="flex flex-col gap-[.4rem]">
                <label
                  className="text-xl text-[#8A8A8A]"
                  htmlFor="userPassword"
                >
                  {!signedUp ? "Enter a password" : "Enter your password"}
                </label>
                <div className="flex flex-row items-center w-full h-[48px] border border-[#d7d7d7] rounded-[6px]">
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full h-full outline-none text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4 flex items-center justify-center"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="userPassword"
                    placeholder="**********"
                  />
                  <span
                    onClick={() => setSnowPassword((prev) => !prev)}
                    className="cursor-pointer w-fit"
                  >
                    {!showPassword ? (
                      <IoEyeOffOutline className="mr-[2rem] text-xl" />
                    ) : (
                      <IoEyeOutline className="mr-[2rem] text-xl" />
                    )}
                  </span>
                </div>
                {signedUp && (
                  <span
                    onClick={() => setResetPassword(true)}
                    className="self-end text-[15px] text-[#6CBC37] font-semibold cursor-pointer"
                  >
                    Forgot Your Password?
                  </span>
                )}
              </div>
            )}
            {!signedUp && (
              <div className="flex flex-col gap-[.4rem]">
                <label
                  className="text-xl text-[#8A8A8A]"
                  htmlFor="userConfirmPassword"
                >
                  Confirm password
                </label>
                <div className="flex flex-row items-center w-full h-[48px] border border-[#d7d7d7] rounded-[6px]">
                  <input
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    className="w-full h-full outline-none text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4 flex items-center justify-center"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="userConfirmPassword"
                    placeholder="**********"
                  />
                  <span
                    onClick={() => setSnowPassword((prev) => !prev)}
                    className="cursor-pointer w-fit"
                  >
                    {!showPassword ? (
                      <IoEyeOffOutline className="mr-[2rem] text-xl" />
                    ) : (
                      <IoEyeOutline className="mr-[2rem] text-xl" />
                    )}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col text-center gap-[2.2rem]">
              {!resetPassword && (
                <button
                  type="submit"
                  className="bg-[#6CBC37] px-4 py-4 border-2 border-transparent hover:border-[#6CBC37] hover:bg-transparent hover:text-[#6CBC37] duration-500 text-white text-xl"
                >
                  {signedUp ? "Login" : "Sign Up"}
                </button>
              )}
              {!resetPassword && (
                <span className="text-[15px] text-[#2C2C2C] font-semibold">
                  {signedUp
                    ? "Dont' have an account? "
                    : "Already have an account? "}
                  <span
                    onClick={() => setSignedUp((prev) => !prev)}
                    className="text-[#6CBC37] cursor-pointer"
                  >
                    {signedUp ? "Sign Up" : "Login"}
                  </span>
                </span>
              )}
              {resetPassword && (
                <button
                  type="submit"
                  className="bg-[#6CBC37] flex items-center justify-center px-4 py-4 border-2 border-transparent hover:border-[#6CBC37] hover:bg-transparent hover:text-[#6CBC37] duration-500 text-white text-xl"
                >
                  {btnLoader ? (
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
                    <span>Reset Password</span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
