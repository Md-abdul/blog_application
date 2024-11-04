import styled from "styled-components";

const imageUrl =
  "https://kalpavrikshaacademy.in/wp-content/themes/kv/assets/img/hero-about.png";

export const Home = () => {
  return (
    <Container>
      <LeftSection>
        <Quote>Writing is the painting of the voice. – Voltaire</Quote>
        <Quote>
          Blogging is not rocket science. It’s about being yourself and putting
          what you have into it.
        </Quote>
        <Quote>
          A blog is merely a tool that lets you do anything from changing the
          world to sharing your shopping list.
        </Quote>
      </LeftSection>
      <RightSection>
        <StyledImage src={imageUrl} alt="Motivational Image" />
      </RightSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  font-family: "Poppins", sans-serif;
`;

const Quote = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-style: italic;
  padding: 1rem;
  background-color: #f9f9f9;
  border-left: 4px solid #2e8b69;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: transform 0.5s ease, background-color 0.3s ease;

  &:hover {
    background-color: #e0f7f1;
    transform: scale(1.05);
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  max-width: 90%;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
