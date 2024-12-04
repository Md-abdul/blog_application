import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../components/Loader";

export const SingleBlog = () => {
  const { _id } = useParams();
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://blog-application-1-si4j.onrender.com/api/blog/oneblog/${_id}`
      );
      setBlogData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [_id]);

  function removeExtraQuotes(str) {
    return typeof str === "string" ? str.replace(/^"(.*)"$/, "$1") : str;
  }

  return (
    <BlogContainer>
      {loading ? (
        <Loader />
      ) : (
        <BlogContent>
          <BlogTitle>{removeExtraQuotes(blogData.title)}</BlogTitle>
          {blogData.image && (
            <BlogImage
              src={
                "https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg"
              }
              alt="Blog Image"
            />
          )}
          <BlogContentText>
            {removeExtraQuotes(blogData.content)}
          </BlogContentText>
        </BlogContent>
      )}
    </BlogContainer> //blog.user.name
  );
};

const BlogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4faff;
  text-align: left;
`;

const BlogContent = styled.div`
  max-width: 60rem;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

const BlogTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;
  text-align: left;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 25rem;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const BlogContentText = styled.p`
  font-size: 1.5rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 40px;
  font-family: "Poppins", sans-serif;
  text-align: left;
`;
