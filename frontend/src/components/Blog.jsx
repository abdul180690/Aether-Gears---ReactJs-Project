import React from 'react'
import { blogs } from '../assets/data'

const Blog = () => {
  return (
    <section className='max-padd-container'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {blogs.slice(0, 4).map((blog)=>(
          <div key={blog.title} className='relative border border-slate-400 rounded-xl p-2 bg-primary'>
            <img src={blog.image} alt="blogimg" className='rounded-xl'/>
            <p className='medium-14 mt-6'>{blog.category}</p>
            <h5 className='h5 pr-4 mb-1'>{blog.title}</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, velit nesciunt.</p>
            <button className="underline mt-2 bold-14">
              continue reading
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blog