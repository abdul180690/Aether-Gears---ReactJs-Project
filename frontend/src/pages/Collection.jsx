import React, { useContext, useEffect, useState } from 'react';
import Search from '../components/Search';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item';
import {FaArrowRight } from 'react-icons/fa';
import notfound from '../assets/not-found.png';




const Collection = () => {
  const { products = [], search } = useContext(ShopContext); 
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [open, setOpen] = useState(false);

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }

    return filtered;
  };

  const applySorting = (productList) => {
    switch (sortType.toLowerCase()) {
      case 'low':
        return productList.sort((a, b) => a.price - b.price);
      case 'high':
        return productList.sort((a, b) => b.price - a.price);
      default:
        return productList;
    }
  };

  useEffect(() => {
    let filtered = applyFilter();
    let sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [category, sortType, products, search]);

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.max(
    Math.ceil(filteredProducts.length / itemsPerPage),
    1
  );

  return (
    <>
      <div className="mt-16 p-5 bg-primary max-padd-container !px-0">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sidebar with dynamic width */}
          <div
            className={` rounded-xl ml-10 pt-5 relative ${open ? 'w-3/12 duration-500' : 'w-24 duration-500'}`}
          >
            <FaArrowRight
              onClick={() => setOpen(!open)}
              className={`p-2 bg-primary text-dark-purple text-5xl rounded-full absolute -right-3 top-9 border-2 border-slate-300 shadow-md cursor-pointer ${
                open ? 'rotate-180 duration-500 mt-0 ml-0' : 'duration-500'
              }`}
            />
            {open && (
              <>
                <Search />
                <div className="pe-20 pl-5 py-5  bg-white rounded">
                  <h5 className="h5 mb-4">Categories</h5>
                  <div className="flex flex-col gap-2 text-sm font-light">
                    {[
                      'Headphones',
                      'Cameras',
                      'Mobiles',
                      'Speakers',
                      'Mouse',
                      'Watches',
                    ].map((cat) => (
                      <label
                        key={cat}
                        className="flex gap-2 medium-14 text-gray-30"
                      >
                        <input
                          onChange={(e) =>
                            toggleFilter(e.target.value, setCategory)
                          }
                          type="checkbox"
                          value={cat}
                          className="w-3"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3 mt-6 bg-white rounded">
                  <h5 className="h5 mb-4">Sort By</h5>
                  <select
                    onChange={(e) => setSortType(e.target.value)}
                    className="border border-slate-900/5 outline-none text-gray-30 medium-14 h-8 w-full rounded px-2"
                  >
                    <option value="relevant">Relevant</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Product List */}
          <div className="pr-5 rounded-1-xl">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
              {getPaginatedProducts().length > 0 ? (
                getPaginatedProducts().map((product) => (
                  <Item key={product.id} product={product} />
                ))
              ) : (
                <div className=''>
                  <img src={notfound} alt="" className='w-72 h-68'/>
                  <p className='h3'>No Products found for selected filters</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flexCenter flex-wrap gap-4 mt-14 mb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`${
                  currentPage === 1 && 'opacity-50 cursor-not-allowed'
                } bg-slate-700 text-white rounded-full !py-1 !px-3`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    currentPage === index + 1 &&
                    '!bg-slate-900 text-black text-xl transitions'
                  } bg-slate-700 text-white rounded-full !py-1 !px-3`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`${
                  currentPage === totalPages && 'opacity-50 cursor-not-allowed'
                } bg-slate-700 text-white rounded-full !py-1 !px-3`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
