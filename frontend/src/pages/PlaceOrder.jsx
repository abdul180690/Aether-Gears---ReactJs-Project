import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import PromoCode from "../components/PromoCode";
import { TiArrowBack } from "react-icons/ti";
import { BsBoxSeamFill } from "react-icons/bs";
import { SiRazorpay } from "react-icons/si";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, products, cartItems, setCartItems, token, backendUrl } =
    useContext(ShopContext);

  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Submit button Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You need to be logged in to place an order.");
      return;
    }
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.color = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let commonOrderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,
      };
      switch (method) {
        // API call for COD
        case "cod":
          const orderData = {
            ...commonOrderData,
            paymentMethod: "cod",
            payment: false,
            paymentStatus: "pending",
          };
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            localStorage.setItem("orderId", response.data.orderId);
            setOrderSuccess(true);
          } else {
            toast.error(response.data.message || "Failed to place order.");
          }
          break;

        // API call for Razorpay
        case "razorpay":
          const razorResponse = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            {
              amount: totalAmount * 100,
            }
          );

          const { order } = razorResponse.data;

          const options = {
            key: "rzp_test_oT9MugG3Tsih9T", // Replace with test key
            amount: totalAmount * 100,
            currency: "INR",
            name: "Aether Gears",
            description: "Test Transaction",
            handler: async function (response) {
              const razorpayOrderData = {
                ...commonOrderData,
                paymentId: response.razorpay_payment_id,
                paymentMethod: "razorpay",
                payment: true,
                paymentStatus: "paid",
              };
              const orderResult = await axios.post(
                backendUrl + "/api/order/place",
                razorpayOrderData,
                { headers: { token } }
              );
              if (orderResult.data.success) {
                setCartItems({});
                localStorage.setItem("orderId", orderResult.data.orderId);
                setOrderSuccess(true);
              } else {
                toast.error("Order placement failed.");
              }
            },
            theme: {
              color: "#121212",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
          break;
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className=" bg-opacity-10 backdrop-blur-lg pb-16">
          <form onSubmit={onSubmitHandler} className="max-padd-container py-10">
            <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
              <div className="flex-1 flex flex-col gap-3 text-[95%]">
                <Title title1={"Delivery "} title2={"Information"} />
                {/*Delivery Information */}
                <div className="flex gap-3 mt-3">
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.firstName}
                      name="firstName"
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="firstName"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.lastName}
                      name="lastName"
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="lastName"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    onChange={onChangeHandler}
                    value={formData.email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                    required
                  />
                  <label
                    for="email"
                    class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={onChangeHandler}
                    value={formData.phone}
                    name="phone"
                    type="number"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                    required
                  />
                  <label
                    for="phoneNumber"
                    class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={onChangeHandler}
                    value={formData.street}
                    name="street"
                    type="text"
                    id="street"
                    placeholder="Street"
                    className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                    required
                  />
                  <label
                    for="street"
                    class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Street
                  </label>
                </div>

                <div className="flex gap-3 mt-3">
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.city}
                      name="city"
                      type="text"
                      id="city"
                      placeholder="City"
                      className="mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="city"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      City
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.state}
                      name="state"
                      type="text"
                      id="state"
                      placeholder="State"
                      className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="state"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      State
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.zipcode}
                      name="zipcode"
                      type="number"
                      id="zipCode"
                      placeholder="zipCode"
                      className="mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="zipCode"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Zip Code
                    </label>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      onChange={onChangeHandler}
                      value={formData.country}
                      name="country"
                      type="text"
                      id="country"
                      placeholder="Country"
                      className=" mb-3 pl-3 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600"
                      required
                    />
                    <label
                      for="country"
                      class="pl-3  absolute left-0 -top-5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Country
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                {/* Promo Code Input */}
                <PromoCode
                  setDiscount={setDiscount}
                  cartData={cartItems}
                  products={products}
                />

                {/* Cart Total with applied discount */}
                <CartTotal
                  discount={discount}
                  setTotalAmount={setTotalAmount}
                />

                <div className="flex items-center justify-center my-6">
                  <h3 className="bold-20 me-5 text-nowrap">Payment Method: </h3>
                  <div className="flex gap-5">
                    <div
                      onClick={() => setMethod("cod")}
                      className={`${
                        method === "cod"
                          ? "bg-slate-800 px-3 py-2 text-white rounded-lg text-nowrap flexCenter"
                          : "bg-white px-3 py-2 text-slate-800  border-2 border-slate-800 rounded-lg text-nowrap flexCenter"
                      }  bold-14 cursor-pointer`}
                    >
                      Cash On Delivery
                    </div>
                    <div
                      onClick={() => setMethod("razorpay")}
                      className={`${
                        method === "razorpay"
                          ? "bg-slate-800 px-3 py-2 text-white rounded-lg text-nowrap flexCenter"
                          : "bg-white px-3 py-2 text-slate-800 border-2 border-slate-800 rounded-lg text-nowrap flexCenter"
                      }  bold-14 cursor-pointer`}
                    >
                      <SiRazorpay className="mr-1" />
                      Razorpay
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly mt-4">
                  <button
                    onClick={() => navigate("/cart")}
                    className="flexCenter mt-6  relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-gray-800 rounded-lg py-1.5 px-5 text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:rounded-lg before:border-2 before:border-gray-800 before:-z-100 before:transition-all"
                  >
                    <TiArrowBack className="me-2 text-xl" />
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flexCenter mt-6  relative font-medium -top-1 -left-1 hover:top-0 hover-left-0 transition-all bg-gray-800 rounded-lg py-1.5 px-5 text-white before:content-[''] before:absolute before:top-1 before:left-1 before:hover:top-0 before:hover:left-0 before:w-full before:h-full before:rounded-lg before:border-2 before:border-gray-800 before:-z-100 before:transition-all"
                  >
                    <BsBoxSeamFill className="me-2" />
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 flex items-center justify-center">
              🎉 Order Placed Successfully! 🎉
            </h2>
            <p className="mt-2 text-lg">Thank you for your purchase! 🛍️</p>
            <button
              onClick={() => {
                setOrderSuccess(false);
                navigate("/orders");
              }}
              className="mt-4 px-5 py-2 bg-green-500 text-white rounded-md"
            >
              View Orders 📦
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
