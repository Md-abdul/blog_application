import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText> © 2024 Blog. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #f7f7f7;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled.p`
  color: #273041;
  font-size: 1rem;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;
