import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getBlog, deleteBlog } from "../Redux/Blog/action";
import { Loader } from "../components/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export const MyBlogs = () => {
  const dispatch = useDispatch();
  const { loading, blogs, error } = useSelector((state) => state.BlogReducer);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleDelete = (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      dispatch(deleteBlog(blogId))
        .then(() => {
          toast.success("Blog deleted successfully!");
          dispatch(getBlog());
        })
        .catch(() => {
          toast.error("Failed to delete blog. Please try again.");
        });
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit/${blogId}`);
  };

  function removeExtraQuotes(str) {
    return typeof str === "string" ? str.replace(/^"(.*)"$/, "$1") : str;
  }

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <BlogContainer>
      <WelcomeContainer>
        <WelcomeMessage>Your Posted Blogs!</WelcomeMessage>

        <AddBLogForm>
          <Link to={"/blogpostform"}>
            <button>Add Blog</button>
          </Link>
        </AddBLogForm>
      </WelcomeContainer>

      {blogs.length === 0 ? (
        <NoDataMessage>No blogs found. Please post some blogs.</NoDataMessage>
      ) : (
        <Grid>
          {blogs.map((blog) => (
            <Card key={blog._id}>
              <IconContainer>
                <FaEdit
                  title="Edit Blog"
                  onClick={() => handleEdit(blog._id)}
                  style={{ fontSize: "1.5rem" }}
                />
                <FaTrashAlt
                  title="Delete Blog"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => handleDelete(blog._id)}
                />
              </IconContainer>
              <Title>{removeExtraQuotes(blog.title)}</Title>
              <Image
                src={
                  "https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg"
                }
                alt={blog.title}
              />
              <Content>{removeExtraQuotes(blog.content)}</Content>
              <Tags>Tags: {removeExtraQuotes(blog.tags)}</Tags>
              <UserInfo>
                <span>{blog.user.name}</span>
                <span>{blog.user.email}</span>
              </UserInfo>
            </Card>
          ))}
        </Grid>
      )}

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
    </BlogContainer>
  );
};

// Styled Components
const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4faff;
  min-height: 100vh;
`;

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const WelcomeMessage = styled.h2`
  color: #030303;
`;

const AddBLogForm = styled.div`
  a {
    text-decoration: none;
  }

  button {
    background-color: #192335;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.3em;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0c1015;
    }

    &:active {
      background-color: #0c1015;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  font-family: "Poppins", sans-serif;
  color: #333;
  position: relative;

  &:hover {
    transform: translateY(-9px);
  }
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #030303;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1em;
  color: #4a4a4a;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tags = styled.div`
  font-size: 0.9em;
  color: #888;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #777;
  margin-top: auto;
  align-items: center;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 1.2em;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 20px;
  right: 20px;
  color: #56d6a1;
  cursor: pointer;

  & > *:hover {
    color: red;
  }
`;
