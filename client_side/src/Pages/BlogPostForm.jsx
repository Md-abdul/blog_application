import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../Redux/Blog/action";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BlogPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const availableTags = ["React", "JavaScript", "CSS", "HTML", "Node.js"];

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTags(selectedTags);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !tags || !content) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    try {
      const success = await dispatch(addBlog(formData));
      if (success) {
        toast.success("Blog post added successfully!");
        setTitle("");
        setContent("");
        setTags([]);
        setImage(null);

        setTimeout(() => {
          navigate('/')
        }, 3000);
      } else {
        toast.error("Failed to add blog post. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Post a Blog</Title>
        <form onSubmit={handleSubmit}>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>Content</Label>
          <TextArea
            rows="6"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Label>Tags</Label>
          <Select multiple value={tags} onChange={handleTagChange}>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
          <Label>Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </FormContainer>
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
    </Container>
  );
};

const Container = styled.div`
  background-color: #f4faff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 600px;
  padding: 30px;
  margin-top: 0.8rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #fafafa;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8em;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  color: #555;
  font-size: 1em;
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin: 8px 0 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 95%;
  padding: 12px;
  margin: 8px 0 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 8px 0 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const Button = styled.button`
  width: 25%;
  padding: 12px;
  background-color: #1e2a3e;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0c1015;
  }

  &:active {
    background-color: #0c1015;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export default BlogPostForm;
