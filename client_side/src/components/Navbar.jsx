import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-1.png";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUsers } from "../Redux/User/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.UserReducer.isAuth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    dispatch(LogoutUsers());
    localStorage.removeItem("token");
    toast.success("Logout success! Thanks for visiting");
    setTimeout(() => {
      navigate("/login");
    }, 2000)

  };

  const handleProfileLinkClick = () => {
    setIsProfileOpen(false); 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && auth) {
      dispatch(LogoutUsers());
    }
  }, [dispatch, auth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS" });
    }
  }, [dispatch]);

  return (
    <>
      <Nav>
        <Link to={"/"}>
          <Image src={logo} alt="Logo" />
        </Link>

        <Hamburger onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>

        <Menu isOpen={isOpen}>
          <CloseIconWrapper onClick={toggleMenu}>
            <FaTimes />
          </CloseIconWrapper>
          {auth ? (
            <>
              <Link to={"/allblogs"}>
                <AllBlogsButton onClick={toggleMenu}>All Blogs</AllBlogsButton>
              </Link>
              <Link to={"/myblogs"}>
                <AllBlogsButton onClick={toggleMenu}>My Blogs</AllBlogsButton>
              </Link>
              <ProfileWrapper>
                <ProfileIcon onClick={toggleProfile}>
                  <FaUserCircle />
                </ProfileIcon>
                {isProfileOpen && (
                  <ProfileDropdown>
                    <Link to={"/profile"} onClick={handleProfileLinkClick}>
                      <ProfileButton>
                        <FaUserCircle style={{ marginRight: "8px", textDecoration:'none' }} />
                        Profile
                      </ProfileButton>
                    </Link>
                    <LogoutButton onClick={handleLogout}>
                      <FaSignOutAlt style={{ marginRight: "8px" }} />
                      Logout
                    </LogoutButton>
                  </ProfileDropdown>
                )}
              </ProfileWrapper>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to={"/login"}>
                  <SignInButton>Sign In</SignInButton>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"/signup"}>
                  <SignUpButton>Sign Up</SignUpButton>
                </Link>
              </MenuItem>
            </>
          )}
        </Menu>
      </Nav>
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 4rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background 0.3s;
  background: ${({ auth }) =>
    auth ? "linear-gradient(90deg, #3cab7d, #56d6a1)" : "#f4faff"};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Image = styled.img`
  width: 7rem;
  height: auto;
`;

const Hamburger = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  color: #b51b1b;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseIconWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    padding-right: 1.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    font-size: 2rem;
    color: white;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 70%;
    background-color: #333;
    padding-top: 3rem;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease-in-out;
    align-items: flex-start;
    padding-left: 1.5rem;
    z-index: 999;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileIcon = styled.div`
  font-size: 2.4rem;
  margin-top: 0.1rem;
  color: #56d6a1;
  cursor: pointer;

  &:hover {
    color: #0c6540;
  }
`;

const ProfileButton = styled.div`
  display: flex;
  color: white;
  background-color: #2e8b69;
  border: 2px solid #2e8b69;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: background-color 0.3s ease;
  font-size: larger;
  &:hover {
    background: linear-gradient(90deg, #2e8b69, #23db98);
    color: white;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;

  background-color: #192335;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;



const AllBlogsButton = styled.button`
  background: white;
  color: #2e8b69;
  border: 2px solid #2e8b69;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: background-color 0.3s ease;
  font-size: larger;
  &:hover {
    background: linear-gradient(90deg, #2e8b69, #23db98);
    color: white;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  background: red;
  padding: 0.8rem 1.1rem;
  color: white;
  font-weight: 500;
  font-size: larger;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: background 0.3s;
  text-decoration: none;
  &:hover {
    background: linear-gradient(90deg, #da1919, #eb291b);
  }
`;

const MenuItem = styled.div`
  margin: 0;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const SignInButton = styled.button`
  background: linear-gradient(90deg, #3cab7d, #56d6a1);
  color: white;
  border: none;
  padding: 1rem 1.9rem;
  font-family: "Poppins", sans-serif;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #2e8b69, #23db98);
  }
`;

const SignUpButton = styled.button`
  background: white;
  color: #2e8b69;
  border: 2px solid #2e8b69;
  padding: 0.9rem 1.6rem;
  font-weight: 500;
  font-size: large;
  font-family: "Poppins", sans-serif;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2e8b69;
    color: white;
  }
`;
