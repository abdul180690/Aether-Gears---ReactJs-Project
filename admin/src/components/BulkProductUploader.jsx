import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import { GrDocumentCsv } from "react-icons/gr";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BulkProductUploader = ({ token, backend_url }) => {
  const [bulkProducts, setBulkProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const products = results.data
          .filter((p) => p.name)
          .map((p) => ({
            ...p,
            colors: (p.colors || "").split(",").slice(0, 4),
            image: (p.image || "").split(",").slice(0, 4),
          }));
        setBulkProducts(products);
        toast.success("Products Data loaded successfully!");
      },
      error: () => toast.error("Failed to parse Products Data file."),
    });
  };

  const updateField = (index, field, value) => {
    const updated = [...bulkProducts];
    updated[index][field] = value;
    setBulkProducts(updated);
  };

  const removeRow = (index) => {
    const updated = [...bulkProducts];
    updated.splice(index, 1);
    setBulkProducts(updated);
  };

  const uploadBulkProducts = async () => {
    if (bulkProducts.length === 0) return toast.error("No products to upload.");

    if (!token) {
      toast.error("Please login again");
      return;
    }
    try {
      console.log("Calling URL:", `${backend_url}/api/product/bulk-add`);
      console.log("Token being sent:", token);
      console.log("Uploading products:", { products: bulkProducts });

      const response = await axios.post(
        `${backend_url}/api/product/bulk-add`,
        { products: bulkProducts },
        {
          headers: {
            token,
          },
        }
      );
      toast.success(response.data.message || "Products uploaded!");
      setBulkProducts([]);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(err.response?.data?.message || "Failed to upload products");
      }
    }
  };

  // Download CSV Template
  const downloadCSVTemplate = () => {
    const headers = [
      "name",
      "description",
      "category",
      "price",
      "popular",
      "colors",
      "image",
    ];
  
    const sampleRows = [
      [
        "Galaxy Buds",
        "High-quality wireless earbuds with noise cancellation",
        "Headphones",
        4999,
        true,
        "Black,White",
        "https://image1.jpg,https://image2.jpg",
      ],
      [
        "Canon EOS",
        "Professional DSLR camera for photography",
        "Cameras",
        59999,
        false,
        "Black",
        "https://camera1.jpg",
      ],
      [
        "Aether Smartwatch",
        "Smartwatch with fitness tracking and AMOLED display",
        "Watches",
        7999,
        true,
        "Black,Silver",
        "https://watch1.jpg,https://watch2.jpg",
      ],
    ];
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...sampleRows.map((r) =>
          r
            .map((field) => `"${String(field).replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "product_csv_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

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

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold  ">
          Bulk Upload Products{" "}
          <small className="text-gray-500 text-sm">
            (upload <GrDocumentCsv className="inline mx-1 text-xl" /> file)
          </small>
        </h2>

        <button
          onClick={downloadCSVTemplate}
          className="bg-green-600 text-white text-xs p-2 font-bold rounded hover:bg-green-700 duration-300"
        >
          Download <GrDocumentCsv className="inline mr-1 text-lg" /> Template 
        </button>
      </div>

      <input
        type="file"
        accept=".csv"
        onChange={handleCSVUpload}
        className="mb-4 block"
      />

      {bulkProducts.length > 0 && (
        <div className="">
          <h4 className="text-md font-semibold mb-2">
            Preview & Edit:{" "}
            <span className="underline">{bulkProducts.length} Products</span>
          </h4>
          <div className="h-[60vh] overflow-y-auto rounded-lg  shadow-lg shadow-gray-500/50">
            <table className="w-full text-sm border-2 border-gray-300  bg-white ">
              <thead className="bg-gray-100">
                <tr className="text-center bg-slate-700 text-white">
                  <th className="border-2 border-gray-300 p-2">Name </th>
                  <th className="border-2 border-gray-300 p-2">Description</th>
                  <th className="border-2 border-gray-300 p-2">Price</th>
                  <th className="border-2 border-gray-300 p-2">Category</th>
                  <th className="border-2 border-gray-300 p-2">Colors</th>
                  <th className="border-2 border-gray-300 p-2">Popular</th>
                  <th className="border-2 border-gray-300 p-2">Image URL</th>
                  <th className="border-2 border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bulkProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        className="w-full px-1 border rounded focus:outline-black"
                        value={product.name || ""}
                        onChange={(e) =>
                          updateField(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        className="w-full px-1 border rounded text-wrap"
                        value={product.description || ""}
                        onChange={(e) =>
                          updateField(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        type="number"
                        className="w-full px-1 border rounded"
                        value={product.price || ""}
                        onChange={(e) =>
                          updateField(index, "price", e.target.value)
                        }
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        className="w-full px-1 border rounded"
                        value={product.category || ""}
                        onChange={(e) =>
                          updateField(index, "category", e.target.value)
                        }
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        className="w-full px-1 border rounded"
                        value={(product.colors || []).join(",")}
                        onChange={(e) =>
                          updateField(
                            index,
                            "colors",
                            e.target.value.split(",").slice(0, 4)
                          )
                        }
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-1">
                      <input
                        className="w-full px-1 border rounded"
                        value={product.popular || ""}
                        onChange={(e) =>
                          updateField(index, "popular", e.target.value)
                        }
                      />
                    </td>
                    <td
                      className="border-2 border-gray-300 p-1"
                      title="Click to view full image"
                    >
                      <div className="flex gap-1 flex-wrap">
                        {(product.image || []).slice(0, 4).map((imgUrl, i) => (
                          <img
                            key={i}
                            src={imgUrl.trim()}
                            alt={`preview-${i}`}
                            className="h-14 w-14 shadow-md hover:scale-110 duration-300 object-cover rounded cursor-pointer mx-auto"
                            onClick={() => setSelectedImage(imgUrl.trim())}
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
                    <td className="border-2 border-gray-300 p-1 text-center">
                      <button
                        className="text-red-500 "
                        onClick={() => removeRow(index)}
                      >
                        <BiTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {bulkProducts.length > 0 && (
        <div className="mt-4 text-right">
          <button
            onClick={uploadBulkProducts}
            className="bg-blue-600 text-white px-4 py-2 my-2 rounded hover:bg-blue-700"
          >
            Upload {bulkProducts.length} Products
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkProductUploader;
