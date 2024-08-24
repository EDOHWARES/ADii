import { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { AppContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAuth = () => {
    const navigate = useNavigate();
  const [showPassword, setSnowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const {serverUrl} = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    secretKey: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
        return {...prev, [name]: value};
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resp = await axios.post(`${serverUrl}/api/admin/login`, {username: form.email, password: form.secretKey});
    console.log(resp)

    if (resp.data.success) {
        localStorage.setItem('adminToken', resp.data.token);
        setLoading(false);
        navigate('/admin/dashboard');
    } else {
        setLoading(false);
        toast.error(resp.data.message);
    };
  };

  return (
    <div>
      <div className="content px-4 md:px-16 w-full flex flex-col gap-[3rem]">
        <div className="head w-full flex items-center justify-center">
          <img src={logo} alt="logo" className="w-[164px] h-[164px]" />
        </div>
        <div className="body">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[2.2rem]">
            <div className="flex flex-col items-start gap-[.4rem]">
              <label className="text-xl text-[#8A8A8A]" htmlFor="userEmail">
                Enter your email or username
              </label>
              <input
                className="w-full h-[48px] border border-[#D7D7D7] outline-none focus:outline-1 focus:border-transparent focus:outline-[#6CBC37] rounded-[6px] text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4"
                placeholder="**************"
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                id="userEmail"
              />
            </div>
            <div className="flex flex-col gap-[.4rem]">
              <label className="text-xl text-[#8A8A8A]" htmlFor="userPassword">
                Enter your secret key
              </label>
              <div className="flex flex-row items-center w-full h-[48px] border border-[#d7d7d7] rounded-[6px]">
                <input
                  className="w-full h-full outline-none text-[#4e4e4e] placeholder:text-[#C6C6C6] bg-transparent indent-4 flex items-center justify-center"
                  type={showPassword ? "text" : "password"}
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleChange}
                  required
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
            </div>
            <div className="flex">
              <button type="submit" className="bg-[#6CBC37] px-4 py-4 border-2 border-transparent hover:border-[#6CBC37] hover:bg-transparent hover:text-[#6CBC37] duration-500 text-white text-xl">
                {loading ? 'Loading...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
