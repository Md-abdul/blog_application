import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { BlogList } from "../Pages/BlogList";
import { Profile } from "../Pages/Profile";
import { MyBlogs } from "../Pages/MyBlogs";
import { PrivateRoutes } from "./PrivateRoutes";
import { SingleBlog } from "../Pages/SingleBlog";
import BlogPostForm from "../Pages/BlogPostForm";
import { EditBlog } from "../Pages/EditBlog";
export const ALlRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/:_id" element={<EditBlog />} />
        <Route
          path="/allblogs"
          element={
            <PrivateRoutes>
              <BlogList />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/myblogs"
          element={
            <PrivateRoutes>
              <MyBlogs />
            </PrivateRoutes>
          }
        />
        <Route path="/singleblog/:_id" element={<SingleBlog />} />
        <Route path="/blogpostform" element={<BlogPostForm />} />
      </Routes>
    </>
  );
};
