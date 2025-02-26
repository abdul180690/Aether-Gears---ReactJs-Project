// import { useEffect, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
// import Login from './pages/Login'
// import Sidebar from './components/Sidebar'
// import { Route, Routes} from 'react-router-dom'
// import Add from './pages/Add'
// import List from './pages/List'
// import Orders from './pages/Orders'

// export const backend_url = import.meta.env.VITE_BACKEND_URL
// export const currency = "₹ "

// export default function App() {

//   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")

//   useEffect(()=>{
//     localStorage.setItem("token", token)
//   }, [token]);


//   return (
//     <main >
//       <ToastContainer />
//       {token === "" ? (
//         <Login setToken={setToken} />
//       ) : (
//         <div className='bg-primary text-[#404040]'>
//           <div className='mx-auto max-w-[1440px] flex flex-col sm:flex sm:flex-row'>
//             <Sidebar setToken = {setToken}/>
//             <Routes>
//               <Route path="/" element={<Add token={token}/>}/>
//               <Route path="/list" element={<List token={token}/>}/>
//               <Route path="/orders" element={<Orders token={token}/>}/>
//             </Routes>
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }


import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom"; // Import useLocation
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹ ";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const location = useLocation(); // Get the current route

  // Update localStorage when token changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Update document title based on route
  useEffect(() => {
    const routeTitles = {
      "/": "Add Item ",
      "/list": "Product List",
      "/orders": "Dashboard - Manage Orders",
    };

    document.title = routeTitles[location.pathname] || "Aether Gears - Admin"; // Default title
  }, [location.pathname]); 

  return (
    <main>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="bg-primary text-[#404040]">
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex sm:flex-row">
            <Sidebar setToken={setToken} />
            <Routes>
              <Route path="/" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  );
}
