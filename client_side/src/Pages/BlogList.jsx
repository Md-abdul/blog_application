import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchBlogs } from "../Redux/Blog/action";
import { Loader } from "../components/Loader";

export const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, blogs, error } = useSelector((state) => state.BlogReducer);

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleBlogClick = (_id) => {
    navigate(`/singleblog/${_id}`);
  };

  const filteredBlogs = blogs
    .filter((blog) => (filter === "All" ? true : blog.tags.includes(filter)))
    .reverse(); 

  function removeExtraQuotes(str) {
    return typeof str === "string" ? str.replace(/^"(.*)"$/, "$1") : str;
  }

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <BlogContainer>
      <WelcomeContainer>
        <WelcomeMessage>Welcome to Our Blog!</WelcomeMessage>
        <FilterContainer>
          <FilterText>Filter Your Blogs:</FilterText>
          <Dropdown onChange={handleFilterChange} value={filter}>
            <option value="All">All Tags</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Node.js">Node.js</option>
          </Dropdown>
        </FilterContainer>
      </WelcomeContainer>

      {filteredBlogs.length === 0 ? (
        <NoDataMessage>No blogs found with the selected filter.</NoDataMessage>
      ) : (
        <Grid>
          {filteredBlogs.map((blog) => (
            <Card key={blog._id} onClick={() => handleBlogClick(blog._id)}>
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
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4faff;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const WelcomeMessage = styled.h2`
  color: #2d3748;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FilterText = styled.span`
  font-size: 1.2em;
  color: #4a5568;
  margin-right: 10px;
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
`;


const Card = styled.div`
  background-color: #cae4e4;
  padding: 20px;
  border-radius: 30px 0px 30px 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  font-family: "Poppins", sans-serif;
  color: #2e8b69;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
  }
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #6d4b40;
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
  color: #6d4b40;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Tags = styled.div`
  font-size: 0.9em;
  color: #0e0c0c;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #060606;
  margin-top: auto;
  align-items: center;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #4a5568;
  font-size: 1.2em;
`;
