// import React from 'react'
// import { blogs } from '../assets/data'

// const Blog = () => {
//   return (
//     <div className='mt-20'>
//       <div className='pb-16'>
//         <div className='max-padd-container '>
//           <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12 pt-6'>
//             {blogs.map((blog)=>(
//               <div key={blog.title} className='relative border border-slate-300 rounded-xl p-2'>
//                 <img src={blog.image} alt="blogimg" className='rounded-xl'/>
//                 <p className='medium-14 mt-6'>{blog.category}</p>
//                 <h5 className='h5 pr-4 mb-1'>{blog.title}</h5>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, velit nesciunt.</p>
//                 <button className="underline mt-2 bold-14">
//                   continue reading
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Blog

import React, { useEffect, useState } from 'react';
import { blogs } from '../assets/data';

const Blog = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when the component is mounted
    setAnimate(true);
  }, []);

  return (
    <div className="mt-20">
      <div className="pb-16">
        <div className="max-padd-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12 pt-6">
            {blogs.map((blog, index) => (
              <div
                key={blog.title}
                className={`relative border border-slate-300 rounded-xl p-2 blog-card ${
                  animate ? 'zoom-in-animation' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`, // Staggered animation
                }}
              >
                <img src={blog.image} alt="blogimg" className="rounded-xl" />
                <p className="medium-14 mt-6">{blog.category}</p>
                <h5 className="h5 pr-4 mb-1">{blog.title}</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita, velit nesciunt.
                </p>
                <button className="underline mt-2 bold-14">
                  continue reading
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
