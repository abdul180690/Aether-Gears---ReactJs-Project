Aether Gears - ReactJs Project
Aether Gears is a full-stack e-commerce application built with React.js on the frontend and Node.js with Express on the backend. It offers a seamless shopping experience with features like user authentication, product browsing, cart management, wishlist functionality, and order processing.

Features
User Authentication: Secure registration and login using JWT.

Product Management: Browse and search for products.

Shopping Cart: Add, update, and remove products from the cart.

Wishlist: Save favorite products for later.

Order Processing: Place orders and view order history.

Admin Panel: Manage products, orders, and users (admin credentials required).

Tech Stack
Frontend: React.js, Redux, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Cloud Services: Cloudinary for image storage

Getting Started
Prerequisites
Node.js and npm installed

MongoDB instance (local or cloud-based)

Cloudinary account for image storage

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/abdul180690/Aether-Gears---ReactJs-Project.git
cd Aether-Gears---ReactJs-Project
Install dependencies for both frontend and backend:

bash
Copy code
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory with the following variables:

env
Copy code
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASS=adminpassword
Start the development servers:

bash
Copy code
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd ../frontend
npm start
The frontend will typically run on http://localhost:3000 and the backend on http://localhost:4000.

Project Structure
lua
Copy code
Aether-Gears---ReactJs-Project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
API Endpoints
User Routes
POST /api/user/register - Register a new user

POST /api/user/login - User login

GET /api/user/profile - Get user profile (requires authentication)

PUT /api/user/profile - Update user profile (requires authentication)

PUT /api/user/change-password - Change user password (requires authentication)

Admin Routes
POST /api/user/admin - Admin login

Note: Additional routes for products, cart, wishlist, and orders are available in their respective route files.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature-name.

Make your changes and commit them: git commit -m 'Add feature'.

Push to the branch: git push origin feature-name.

Submit a pull request.

License
This project is open-source and available under the MIT License.
