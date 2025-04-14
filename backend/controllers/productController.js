import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";

// controller function for adding product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, colors, popular} = req.body

        // extracting images if provided
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

        // upload images to cloudinary or use a default image
        let imagesUrl;
        if(images.length > 0){
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                    return result.secure_url
                })
            )
        } else {
            // default image url if no images are provided
            imagesUrl = ['https://via.placeholder.com/150']
        }
        // create product data
        const productData = {
            name, 
            description,
            price,
            category,
            popular: popular == 'true' ? true : false,
            colors: colors ? JSON.parse(colors) : [], //defaul to empty array if colors not provided
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// controller function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// controller function for list of products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// controller function for single product
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product})
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// controller function for Adding bulk products
const addBulkProducts = async (req, res) => {
    try {
      const { products } = req.body;
  
      if (!Array.isArray(products)) {
        return res.status(400).json({ success: false, message: "Invalid products data format" });
      }
  
      // Process each product (can also validate each entry here)
      const bulkProducts = products.map(prod => ({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        category: prod.category,
        popular: prod.popular || false,
        colors: prod.colors || [],
        image: prod.image || ['https://via.placeholder.com/150'], // fallback
        date: Date.now()
      }));
  
      // Insert into DB
      await productModel.insertMany(bulkProducts);
      res.json({ success: true, message: `${bulkProducts.length} products added successfully.` });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  // controller function for updating product
  const updateProduct = async (req, res) => {
    try {
      const {
        _id,
        name,
        description,
        price,
        category,
        colors,
        image,
        popular
      } = req.body;
  
      const updatedProduct = await productModel.findByIdAndUpdate(
        _id,
        {
          name,
          description,
          price,
          category,
          colors,
          image,
          popular
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.json({ success: true, message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
  

export {addProduct, removeProduct, listProducts, singleProduct, addBulkProducts, updateProduct}