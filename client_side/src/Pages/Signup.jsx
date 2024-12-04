import { useState } from "react";
import styled from "styled-components";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../Redux/User/action";

import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await dispatch(register(formData));
      toast.success("Signup Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const Googlebtn = () => {
    toast.error("Please fill in your data in the inputs.");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <Container>
      <WelcomeMessage>Welcome! Please sign up to continue</WelcomeMessage>
      <GoogleSignInButton onClick={Googlebtn}>
        <FaGoogle style={{ marginRight: "8px" }} />
        Sign in with Google
      </GoogleSignInButton>
      <Divider>or</Divider>
      <Form onSubmit={handleSignup}>
        <Label>
          Name*
          <Input
            type="text"
            placeholder="Enter your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Email*
          <Input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Label>
        <PasswordContainer>
          <Label>
            Password*
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Label>
          <PasswordToggle onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordContainer>
        <SignupButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </SignupButton>
      </Form>

      <FooterText>
        Already have an account? <SignInLink href="/login">Sign in</SignInLink>
      </FooterText>
      <FooterInfo>
        We never share your information with anyone. We only collect information
        to suggest relevant content.
      </FooterInfo>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0rem 2rem;
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
`;

const WelcomeMessage = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  color: #192335;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const GoogleSignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
  color: #080808;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  font-family: "Poppins", sans-serif;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  margin: 0.2rem 0;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #d12727;
    margin: 0 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-top: 0.6rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 94%;

  &:focus {
    outline: none;
    border-color: #2e8b69;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%; /* Matches Input width */
  margin-bottom: 1rem;
`;

const PasswordToggle = styled.div`
  position: absolute;
  top: 55%;
  right: 12px; /* Adjusted for padding */
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
`;

const SignupButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: white;
  background-color: #2e8b69;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #217053;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 1rem;
  font-family: "Poppins", sans-serif;
`;

const SignInLink = styled.a`
  color: #4285f4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterInfo = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-family: "Poppins", sans-serif;
  margin-top: -0.8rem;
  text-align: center;
  line-height: 1.5;
`;
