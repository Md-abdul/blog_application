import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #edf2f7;
`;

const LoaderCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #56d6a1;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
};
