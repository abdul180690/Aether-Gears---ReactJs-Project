import React, { useEffect, useState } from 'react';
import { blogs } from '../assets/data';
import Header from '../components/Header';

const Blog = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when the component is mounted
    setAnimate(true);
  }, []);

  return (
    <>
      <Header />
      <div className="max-padd-container mt-10 mb-20">
        <h1 className='text-center h3 underline text-amber-800'>Shop Smart: Expert Tips & Trends</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12 pt-6 ">
          {blogs.map((blog, index) => (
            <div
              key={blog.title}
              className={`relative border bg-white border-slate-400 rounded-xl p-2 blog-card shadow-lg ${
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
    </>
  );
};

export default Blog;
