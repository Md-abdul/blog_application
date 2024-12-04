import { useState } from "react";
import styled from "styled-components";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/User/action";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true); // Start loader
    try {
      let IsAuthincate = await dispatch(signIn(formdata));

      if (IsAuthincate) {
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/allblogs"); // allblogs
        }, 4000);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.error(
        `Login failed: ${error.message || "An unexpected error occurred."}`
      );
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const Googlebtn = () => {
    toast.error("Please fill your data in the inputs.");
  };

  return (
    <Container>
      <WelcomeMessage>Welcome! Please sign In to continue</WelcomeMessage>
      <GoogleSignInButton onClick={Googlebtn}>
        <FaGoogle style={{ marginRight: "8px" }} />
        Sign in with Google
      </GoogleSignInButton>
      <Divider>or</Divider>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email*
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formdata.email}
            onChange={handleInput}
          />
        </Label>
        <PasswordContainer>
          <Label>
            Password*
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={formdata.password}
              onChange={handleInput}
            />
          </Label>
          <PasswordToggle onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordContainer>
        <SignupButton type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </SignupButton>
      </Form>
      <FooterText>
        Already have an account? <SignInLink href="/signup">Sign Up</SignInLink>
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
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  border-radius: 8px;
  background-color: #ffffff;
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
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  margin: 1rem 0;
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
  margin-top: 0.4rem;
  font-size: 1rem;
  border: 1px solid #150b0b;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2e8b69;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const PasswordToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
`;


const FooterText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 1.2rem;
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
