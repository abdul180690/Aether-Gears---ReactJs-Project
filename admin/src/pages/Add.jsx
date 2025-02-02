import React, { useState, useCallback } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import upload_icon from "../assets/upload_icon.png";
import { backend_url } from "../App";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("100");
  const [category, setCategory] = useState("Headphones");
  const [popular, setPopular] = useState(false);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }
    setImages((prev) => ({ ...prev, [key]: file }));
  };

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic Validation
      if (!name || !description || !price || !category) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (
        !images.image1 &&
        !images.image2 &&
        !images.image3 &&
        !images.image4
      ) {
        toast.error("Please upload at least one product image.");
        return;
      }

      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("popular", JSON.stringify(popular));
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
          setName("");
          setDescription("");
          setPrice("");
          setImages({ image1: null, image2: null, image3: null, image4: null });
          setColors([]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Server error occurred.");
        } else if (error.request) {
          toast.error("No response from the server. Please check your connection.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    },
    [name, description, price, category, popular, colors, images, token]
  );

  const ImageUpload = ({ imgKey, images, handleImageChange }) => (
    <label htmlFor={imgKey}>
      <img
        src={images[imgKey] ? URL.createObjectURL(images[imgKey]) : upload_icon}
        alt=""
        className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg cursor-pointer"
      />
      <input
        onChange={(e) => handleImageChange(e, imgKey)}
        type="file"
        id={imgKey}
        hidden
      />
    </label>
  );

  return (
    <div className="px-2 xs:px-8 xs:pt-3 sm:px-8 mt-2 sm:mt-6 pb-16">
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
            <h5 className="h5">Product Price</h5>
            <input
              id="productPrice"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="100"
              className="px-3 py-2 bg-white max-w-24 ring-1 ring-slate-900/5"
            />
          </div>
        </div>

        <div>
          <h5 className="h5">Product Colors</h5>
          <div className="flex gap-2 my-4">
            {["Black", "Red", "White", "Blue"].map((color, i) => (
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
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;
