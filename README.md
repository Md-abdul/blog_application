# 📝 MERN Blog Application

A full-stack blogging platform built using the MERN stack, where users can read, post, update, and delete blogs. The application features a responsive UI, secure authentication using JSON Web Tokens (JWT), and proper access control for blog management.





## 🚀 Features

- 🔑 Authentication & Authorization: User login and signup using JWT.
- 📰 View Blogs: All users can view all blogs.
- ✏️ Edit & Delete Blogs: Only blog owners can edit or delete their posts.
- 🆕 Latest Blogs First: Blogs are displayed in reverse chronological order.
- 🌐 Responsive Design: Fully responsive UI for all devices.
- 🎨 Styled Components: Clean and reusable component-based styling.





## 🖥️ Tech Stack

- Frontend: React, Styled-Components
- Backend: Node.js, Express
- Database: MongoDB
- State Management: Redux
- Authentication: JSON Web Tokens (JWT)





## 🗂️ Folder Structure

### Client-Side (React)
    client/
    ├── public/
    │   ├── index.html         # Main HTML file
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Footer.jsx
    │   │   ├── Loader.jsx
    │   │   └── Navbar.jsx
    │   ├── pages/             # Application pages
    │   │   ├── BlogList.jsx
    │   │   ├── BlogPostForm.jsx
    │   │   ├── EditBlog.jsx
    │   │   ├── EditModalUser.jsx
    │   │   └── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── MyBlogs.jsx
    │   │   └── Profile.jsx
    │   │   ├── Signup.jsx
    │   │   ├── SingleBlog.jsx
    │   ├── redux/             # Redux setup
    │   │   ├── store.js
    │   │   ├── Blog/
    │   │   └── User/
    │   ├── utils/             # Utility functions
    │   ├── App.js             # Main application component
    │   ├── index.js           # Entry point
    │   └── styles/            # Global styles

### Server-Side (Node.js + Express)
    server/
    ├── config/
    │   ├── db.js              # Database connection
    ├── middlewares/           # Middleware (e.g., auth)
    │   ├── authMiddleware.js
    ├── models/                # Database models
    │   ├── user.model.js
    │   ├── blog.model.js
    ├── routes/                # Route handlers
    │   ├── userRoutes.js
    │   ├── blogRoutes.js
    ├── .env                   # Environment variables
    ├── index.js              # Entry point





## Backend Routes and Access Levels

### 🔑 Authentication Routes

| Route                 | Method | Access | Description                |
|-----------------------|--------|--------|----------------------------|
| `/api/user/register`  | POST   | Public | Register a new user         |
| `/api/user/login`     | POST   | Public | Login user and generate JWT |

### 📖 Blog Routes

| Route                      | Method | Access         | Description                       |
|----------------------------|--------|----------------|-----------------------------------|
| `/api/blog/allblog`        | GET    | Public         | Get all blogs (newest first)      |
| `/api/blogs/oneblog/_id`   | GET    | Public         | Get a specific blog               |
| `/api/blog/addblog`        | POST   | Authenticated  | Create a new blog                 |
| `/api/blog/updateblog/_id` | PUT    | Blog Owner Only | Update an existing blog           |
| `/api/blog/deleteblog/_id` | DELETE | Blog Owner Only | Delete a blog                     |
| `/api/blog/myblogs`        | GET    | Authenticated  | Get blogs posted by the logged-in user |
| `/api/user/profile`        | GET    | Authenticated  | Get the profile of the logged-in user |





## 🛠️ Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Md-Abdul/blog_application.git
   cd blog_application
   
2. Install Dependencies:
   - Client:
     
     ```bash
     cd client
     npm install

   - Server

     ```bash
     cd client
     npm install

3. Set Up Environment Variables
   -Create a .env file in the server directory with the following:

     ```bash
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000

4. Run the Application:
   - Client:
     
     ```bash
     cd client
     npm run dev

   - Server

     ```bash
     cd client
     npm run server




## 🙌 Contributions 

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.     


## 📄 License 

This project is licensed under the MIT License. See the LICENSE file for details.


## 📧 Contact 

For any inquiries, contact me at mdabdulq62@gmail.com.




## 🌟 End Note 😊

Thank you for exploring this project! Contributions, suggestions, and feedback are always welcome. This blog application is just the beginning—feel free to expand and customize it further.

> "The art of writing is the art of discovering what you believe."  
> — Gustave Flaubert

**Happy coding! 🚀** 😊😊😊
