import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../Redux/User/action";
import PropTypes from "prop-types";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EditButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const EditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = () => {
    dispatch(updateUserProfile({ name, email }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Edit Profile</h2>
        <EditInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EditInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <EditButton onClick={handleUpdate}>Save</EditButton>
      </ModalContent>
    </ModalContainer>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditModal;
