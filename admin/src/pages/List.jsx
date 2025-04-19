import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend_url, currency } from "../App";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMic } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { BiX } from "react-icons/bi";
import { FaHeadphones, FaMouse } from "react-icons/fa";
import { IoCameraSharp, IoWatch } from "react-icons/io5";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { BsFillSpeakerFill } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { ImDroplet } from "react-icons/im";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({}); // Store category-wise count
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const categoryBgColor = {
    headphones: "bg-red-100",
    mobiles: "bg-green-100",
    cameras: "bg-blue-100",
    mouse: "bg-yellow-100",
    watches: "bg-pink-100",
    speakers: "bg-orange-100",
  };

  const categoryIcons = {
    Headphones: <FaHeadphones className="inline mr-1 text-lg" />,
    Cameras: <IoCameraSharp className="inline mr-1 text-lg" />,
    Mobiles: <HiDevicePhoneMobile className="inline mr-1 text-lg" />,
    Mouse: <FaMouse className="inline mr-1 text-lg" />,
    Watches: <IoWatch className="inline mr-1 text-lg" />,
    Speakers: <BsFillSpeakerFill className="inline mr-1 text-lg" />,
  };

  const openEditModal = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        calculateCategoryCounts(response.data.products);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Calculate product count per category
  const calculateCategoryCounts = (products) => {
    const counts = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    setCategoryCounts(counts);
  };

  // Remove product function
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Filter list based on search input
  const filteredList = list.filter((item) =>
    [item.name, item._id, item.category].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Start voice search
  const startListening = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        setSearchTerm(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        toast.error("Speech recognition error.");
        setIsListening(false);
      };
    } else {
      toast.error("Speech recognition not supported.");
    }
  };

  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  // Handle Escape key to close image preview
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      toast.info("Press ESC or click the image to close", { autoClose: 1000 });
    }
  }, [selectedImage]);

  // Format currency function
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="px-5 py-5">
      {/* Category Count Display */}
      <div className="mb-4 font-semibold text-gray-700 text-center">
        <div className="text-xl text-red-500 font-bold mb-2">
          Total Products: {list.length}
        </div>
        {Object.keys(categoryCounts).map((category) => {
          const normalizedCategory = category.toLowerCase();
          return (
            <span
              key={category}
              className=" text-sm inline-flex items-center mx-3 mb-3"
            >
              <span
                className={`p-2 rounded border border-black/20 shadow-md ${
                  categoryBgColor[normalizedCategory] || "bg-gray-200"
                }`}
              >
                {categoryIcons[category]}
                {category}:{" "}
                <span className="font-bold">{categoryCounts[category]}</span>
              </span>
            </span>
          );
        })}
      </div>

      {/* Search Input Box */}
      <div className="mb-4 relative shadow-lg">
        <input
          type="text"
          placeholder="Search here"
          className="w-full p-2 pl-10 pr-12 border border-gray-300 rounded-md sm:text-base text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 sm:text-xl text-lg " />
        <MdMic
          onClick={startListening}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer sm:text-xl text-lg ${
            isListening ? "text-blue-500" : ""
          }`}
        />
      </div>

      {/* Buttons */}
      <div className="mb-4 flex gap-3">
        <button
          onClick={() => {
            const allIds = filteredList.map((item) => item._id);
            setSelectedItems(selectAll ? [] : allIds);
            setSelectAll(!selectAll);
          }}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 duration-300"
        >
          <BiSolidSelectMultiple className="inline mr-2" />
          {selectAll ? "Unselect All" : "Select All"}
        </button>

        <button
          onClick={() => {
            if (selectedItems.length === 0) {
              toast.warning("No items selected.");
              return;
            }
            const selectedData = list.filter((item) =>
              selectedItems.includes(item._id)
            );

            const headers = [
              "ID",
              "Name",
              "Description",
              "Category",
              "Old Price",
              "Price",
              "Popular",
              "Colors",
              "Images",
            ];
            const rows = selectedData.map((item) => [
              item._id,
              item.name,
              `"${item.description.replace(/"/g, '""')}"`, // Escape double quotes
              item.category,
              item.oldPrice || "-",
              item.price,
              item.popular ? "Yes" : "No",
              `"${item.colors.join(", ").replace(/"/g, '""')}"`, // Join and wrap
              `"${item.image.join(", ").replace(/"/g, '""')}"`, // Join and wrap
            ]);

            const csvContent =
              "data:text/csv;charset=utf-8," +
              [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "selected_products.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 duration-300"
        >
          Export as <GrDocumentCsv className="inline" />
        </button>
      </div>

      {/* Render filtered products */}
      <div className="overflow-x-auto h-[80vh] w-[80vw] shadow-md my-2">
        <table className="min-w-[900px] w-full text-sm text-left text-gray-600 border border-black">
          <thead className="text-xs uppercase bg-gray-800 text-white">
            <tr>
              <th className=""></th>
              <th className="px-4 py-3 text-center">Product ID</th>
              <th className="px-4 py-3 text-center">Product Images</th>
              <th className="px-4 py-3 text-center">Product Name</th>
              <th className="px-4 py-3 text-center">Description</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-center">Available Colors</th>
              <th className="px-4 py-3 text-center">Old Price</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Popular</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item) => (
              <tr
                key={item._id}
                className={`border-t  ${
                  categoryBgColor[item.category.toLowerCase()] || "bg-white"
                }`}
              >
                <td className="px-4 py-2 text-center border border-black">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => {
                      setSelectedItems((prev) =>
                        prev.includes(item._id)
                          ? prev.filter((id) => id !== item._id)
                          : [...prev, item._id]
                      );
                    }}
                  />
                </td>

                <td className=" p-2 text-center  border border-black">
                  <div className="flex items-center justify-center h-full ">
                    <span className="text-gray-500 text-wrap text-xs font-semibold">
                      {item._id}
                    </span>
                  </div>
                </td>

                <td
                  className="py-2 px-4 border border-black text-center"
                  title="Click to view full image"
                >
                  <div className="grid col-1 gap-1 justify-center">
                    {item.image.slice(0, 4).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`img-${idx}`}
                        className="h-22 w-22 object-cover shadow-md shadow-gray-800/20 rounded cursor-pointer mx-auto hover:scale-125 duration-300"
                        onClick={() => setSelectedImage(img.trim())}
                      />
                    ))}
                  </div>
                  {selectedImage && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                      onClick={() => setSelectedImage(null)}
                    >
                      <img
                        src={selectedImage}
                        alt="Full View"
                        className="max-w-full max-h-full rounded shadow-lg"
                      />
                    </div>
                  )}
                </td>

                <td className="py-2 px-4 border border-black font-semibold">
                  {item.name}
                </td>
                <td className="py-2 px-4 border border-black">
                  {item.description}
                </td>
                <td className="py-2 px-4 border border-black capitalize text-nowrap">
                  {categoryIcons[item.category]}
                  {item.category}
                </td>

                <td className="py-2 px-4 border border-black">
                  <div className="flex justify-center">
                    {item.colors?.length > 0 ? (
                      <div className="flex gap-1">
                        {item.colors.map((color, index) => (
                          <ImDroplet
                            key={index}
                            className="text-2xl -rotate-12"
                            style={{ color: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No color</span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border border-black text-nowrap text-right font-semibold">
                  {item.oldPrice ? (
                    <span className="text-red-600 line-through">
                      Rs. {formatCurrency(item.oldPrice)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="py-2 px-4 border border-black text-nowrap text-right font-semibold">
                  Rs. {formatCurrency(item.price)}
                </td>
                <td className="py-2 px-4 border border-black text-center">
                  {item.popular ? "✅" : "❌"}
                </td>
                <td className="py-2 px-4 border border-black text-center">
                  <div className="flex justify-center gap-3 text-xl">
                    <TbEdit
                      onClick={() => openEditModal(item)}
                      className="text-blue-500 cursor-pointer"
                    />
                    <TbTrash
                      onClick={() => removeProduct(item._id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {showModal && editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 w-[95%] max-w-4xl h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <BiX
                className="right-0 text-3xl text-red-500 hover:bg-red-500 hover:text-white rounded-full"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Name
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded"
                  placeholder="Name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Category
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded"
                  placeholder="Category"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Old Price
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded"
                  placeholder="Old Price"
                  type="number"
                  value={editProduct.oldPrice || ""}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      oldPrice: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Price
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded"
                  placeholder="Price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, price: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Description
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded"
                  placeholder="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Colors
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded col-span-2"
                  placeholder="Colors (comma-separated)"
                  value={
                    Array.isArray(editProduct.colors)
                      ? editProduct.colors.join(",")
                      : editProduct.colors
                  }
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      colors: e.target.value.split(",").slice(0, 4),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1">
                <label htmlFor="" className="mr-1">
                  Images
                </label>
                <input
                  className="border-2 border-gray-300 focus:border-gray-600 focus:outline-none p-2 rounded col-span-2"
                  placeholder="Images (comma-separated URLs)"
                  value={
                    Array.isArray(editProduct.image)
                      ? editProduct.image.join(",")
                      : editProduct.image
                  }
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      image: e.target.value.split(",").slice(0, 4),
                    })
                  }
                />
              </div>

              <label className="col-span-2 flex items-center gap-2">
                <input
                  className="w-4 h-4 border-2 border-gray-300 focus:border-gray-600 focus:outline-none"
                  type="checkbox"
                  checked={editProduct.popular}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      popular: e.target.checked,
                    })
                  }
                />
                Popular Product
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 duration-300"
                onClick={async () => {
                  try {
                    const updatedProduct = {
                      ...editProduct,
                      colors: Array.isArray(editProduct.colors)
                        ? editProduct.colors
                        : editProduct.colors
                            .split(",")
                            .map((c) => c.trim())
                            .slice(0, 4),
                      image: Array.isArray(editProduct.image)
                        ? editProduct.image
                        : editProduct.image
                            .split(",")
                            .map((i) => i.trim())
                            .slice(0, 4),
                    };

                    const res = await axios.post(
                      backend_url + "/api/product/update",
                      updatedProduct,
                      {
                        headers: {
                          token,
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (res.data.success) {
                      toast.success("Product updated!");
                      fetchList();
                      setShowModal(false);
                    } else {
                      toast.error(res.data.message);
                      console.log(res.data.message);
                    }
                  } catch (err) {
                    toast.error(err.response?.data?.message || err.message);
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
