import React, { useState, useCallback } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import upload_icon from "../assets/upload_icon.png";
import { backend_url } from "../App";
import BulkProductUploader from "../components/BulkProductUploader";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Headphones");
  const [popular, setPopular] = useState(false);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Image Upload Handler
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }
    setImages((prev) => ({ ...prev, [key]: file }));
  };

  // Form Submit Handler
  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic validation
      if (!name || !description || !price || !oldPrice || !category) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (parseFloat(price) <= 0 || parseFloat(oldPrice) <= 0) {
        toast.error("Prices must be greater than 0.");
        return;
      }

      if (parseFloat(price) > parseFloat(oldPrice)) {
        toast.error("Discounted price should be less than original price.");
        return;
      }

      if (colors.length === 0) {
        toast.error("Please select at least one color.");
        return;
      }

      const uploadedImages = Object.values(images).filter(img => img !== null);
      if (uploadedImages.length === 0) {
        toast.error("Please upload at least one product image.");
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("oldPrice", oldPrice);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("popular", popular);
        formData.append("colors", JSON.stringify(colors));

        Object.keys(images).forEach((key) => {
          if (images[key]) formData.append(key, images[key]);
        });

        const response = await axios.post(
          `${backend_url}/api/product/add`,
          formData,
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          // Reset form
          setName("");
          setDescription("");
          setOldPrice("");
          setPrice("");
          setImages({ image1: null, image2: null, image3: null, image4: null });
          setColors([]);
          setPopular(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                           error.request ? "No response from server" : 
                           "An unexpected error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [name, description, price, oldPrice, category, popular, colors, images, token]
  );

  // Image Upload Component
  const ImageUpload = ({ imgKey, images, handleImageChange }) => (
    <label htmlFor={imgKey} className="relative">
      <img
        src={images[imgKey] ? URL.createObjectURL(images[imgKey]) : upload_icon}
        alt=""
        className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg cursor-pointer"
      />
      {images[imgKey] && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setImages(prev => ({ ...prev, [imgKey]: null }));
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
        >
          ×
        </button>
      )}
      <input
        onChange={(e) => handleImageChange(e, imgKey)}
        type="file"
        id={imgKey}
        accept="image/*"
        hidden
      />
    </label>
  );

  return (
    <div className="px-2 xs:px-8 xs:pt-3 sm:px-8 mt-2 sm:mt-6 pb-16">
      {/* Bulk products upload */}
      <BulkProductUploader token={token} backend_url={backend_url}/>
      <hr className="border-2 border-black/50"/>

      {/* Single product upload */}
      <h2 className="h3 mt-4">Add New Product</h2>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3 medium-14 lg:w-[777px]"
      >
        <div className="w-full">
          <h5 className="h5">Product Name</h5>
          <input
            id="productName"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Write here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
            required
          />
        </div>

        <div className="w-full">
          <h5 className="h5">Product Description</h5>
          <textarea
            id="productDescription"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={5}
            placeholder="Write here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-full max-w-lg"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <h5 className="h5">Categories</h5>
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="max-w-40 px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded"
              required
            >
              <option value="Headphones">Headphones</option>
              <option value="Cameras">Cameras</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Speakers">Speakers</option>
              <option value="Mouse">Mouse</option>
              <option value="Watches">Watches</option>
            </select>
          </div>

          <div>
            <h5 className="h5">Original Price</h5>
            <input
              id="oldPrice"
              onChange={(e) => setOldPrice(e.target.value)}
              value={oldPrice}
              type="number"
              min="1"
              placeholder="100"
              className="px-3 py-2 bg-white max-w-24 ring-1 ring-slate-900/5"
              required
            />
          </div>
          <div>
            <h5 className="h5">Discounted Price</h5>
            <input
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              min="1"
              placeholder="100"
              className="px-3 py-2 bg-white max-w-24 ring-1 ring-slate-900/5"
              required
            />
          </div>
        </div>

        <div>
          <h5 className="h5">
            Available Product Colors{" "}
            <span className="text-xs text-gray-400">
              (Choose at least one or multiple colors)
            </span>
          </h5>
          <div className="flex gap-2 my-4">
            {["Black", "Red", "White", "Blue", "Silver", "Orange", "Yellow"].map((color, i) => (
              <div
                key={i}
                onClick={() =>
                  setColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  )
                }
              >
                <span
                  className="h-9 w-9 rounded-full flexCenter ring-1 ring-slate-900/20 cursor-pointer"
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  {colors.includes(color) && (
                    <FaCheck
                      className={
                        color === "White" ? "text-black" : "text-white"
                      }
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h5 className="h5">
          Product Images{" "}
          <span className="text-xs text-gray-400">
            (Upload at least one or multiple images)
          </span>
        </h5>
        <div className="flex gap-3 pt-2">
          {["image1", "image2", "image3", "image4"].map((imgKey, i) => (
            <ImageUpload
              key={i}
              imgKey={imgKey}
              images={images}
              handleImageChange={handleImageChange}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 my-2">
          <input
            onChange={() => setPopular((prev) => !prev)}
            checked={popular}
            id="popular"
            type="checkbox"
          />
          <label htmlFor="popular" className="cursor-pointer">
            Add to Popular
          </label>
        </div>

        <button
          type="submit"
          className="btn-dark mt-3 max-w-44 sm:w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span>Adding...</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MdFormatListBulletedAdd className="text-lg" />
              Add Product
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;