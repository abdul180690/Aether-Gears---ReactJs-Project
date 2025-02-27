import React, { useState, useContext, useEffect } from "react";
import bg from "../assets/login-bg.jpg";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Eye icons
import { motion } from "framer-motion";
import register from "../assets/register.gif"
import login from "../assets/login.gif"

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.reload();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className="relative">
        <img src={bg} className="h-[90vh] object-cover w-full" />
        <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full">
          <motion.form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md md:w-[60%] lg:w-[40%] m-auto gap-y-5 p-8 rounded-3xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Transition duration for the form
          >
            {/* Animated Title */}
            <motion.div
              className="flexBetween w-full mb-5"
              initial={{ opacity: 0, scale:0}}
              animate={{ opacity: 1, scale:1 }}
              transition={{ duration: 0.5, delay: 0.2 }} // Fade in delay for the title
            >
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-wider text-slate-800">
                <span className="underlined">{currState}</span>
              </h3>
              {currState === "Sign Up" && (
                <img src={register} alt="" className="w-12 h-12 rounded-md"/>
              )}
              {currState === "Login" && (
                <img src={login} alt="" className="w-12 h-12 rounded-md"/>
              )}
              
            </motion.div>

            {/* Name input for Sign Up */}
            {currState === "Sign Up" && (
              <motion.div
                className="relative w-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              > 
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                />
                <label
                  htmlFor="name"
                  className="pl-3 absolute left-0 -top-6 text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm duration-300"
                >
                  Full Name
                </label>
              </motion.div>
            )}

            {/* Email input */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className="rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
              />
              <label
                htmlFor="email"
                className="pl-3 absolute left-0 -top-6 text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm"
              >
                Email Address
              </label>
            </motion.div>

            {/* Password input */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                id="password"
                name="password"
                placeholder="Password"
                className="rounded-lg mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
              />
              <label
                htmlFor="password"
                className="pl-3 absolute left-0 -top-6 text-black transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-600 peer-focus:text-sm"
              >
                Password
              </label>

              {/* Eye icon to toggle password visibility */}
              <span
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                className="absolute right-3 top-2 cursor-pointer hover:scale-110 ease-in-out duration-300"
              >
                {passwordVisible ? (
                  <AiOutlineEyeInvisible size={24} color="gray" />
                ) : (
                  <AiOutlineEye size={24} color="gray" />
                )}
              </span>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="p-5 bg-slate-900 text-primary !py-[8px] !rounded-full tracking-widest hover:px-7 hover:tracking-[5px] hover:shadow-lg duration-300 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currState === "Sign Up" ? "Sign Up" : "Login" }
            </motion.button>

            {/* Switch between Sign Up and Login */}
            <motion.div
              className="w-full flex flex-col gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {currState === "Login" ? (
                <>
                  <div className="medium-15 cursor-pointer text-primary underline hover:text-slate-800">
                    Forgot your password?
                  </div>
                  <div className="medium-15 text-primary">
                    Don't have an account?
                    <span
                      onClick={() => setCurrState("Sign Up")}
                      className="cursor-pointer pl-1 underline hover:text-slate-800 font-extrabold"
                    >
                      Create account
                    </span>
                  </div>
                </>
              ) : (
                <div className="medium-15 text-primary">
                  Already registered?
                  <span
                    onClick={() => setCurrState("Login")}
                    className="cursor-pointer pl-1 underline hover:text-slate-800"
                  >
                    Login
                  </span>
                </div>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default Login;
