import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../Redux/Blog/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
export const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://blog-application-1-si4j.onrender.com/api/blog/oneblog/${_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        console.log(blog);
        setFormData({
          title: data.title || "",
          content: data.content || "",
          tags: data.tags || "",
        });
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateBlog(_id, formData));
      toast.success("Blog updated successfully!");

      setTimeout(() => {
        navigate("/myblogs");
      }, 5000);
    } catch (error) {
      toast.error("Failed to update blog. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Title>Edit Blog - {formData.title}</Title>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                placeholder="Write your blog content here..."
                required
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., React, JavaScript"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </FormContainer>
      </Container>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

const Container = styled.div`
  background-color: #f4faff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  margin-top: -6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #4a4a4a;
  font-family: "Poppins", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  font-family: "Poppins", sans-serif;
  font-size: medium;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  resize: none;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
  font-size: medium;
  line-height: 1.6rem;
  font-family: "Poppins", sans-serif;
`;

const Button = styled.button`
  background-color: #192335;
  color: white;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0c1015;
  }
  font-family: "Poppins", sans-serif;
`;
