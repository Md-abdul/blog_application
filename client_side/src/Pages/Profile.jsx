import { useEffect, useState } from "react";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { FaEdit } from "react-icons/fa";
import EditModal from "./EditModalUser";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://blog-application-1-si4j.onrender.com/api/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, email } = userData || {};

  return (
    <ProfileContainer>
      <ProfileCard>
        <EditIcon />
        <ProfileImage
          src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg"
          alt="User Profile"
        />
        <ProfileInfo>
          <UserName>Name :- {name || "Username"}</UserName>
          <UserEmail>Email :- {email || "user@example.com"}</UserEmail>
          <UserPassword>Password: ...............</UserPassword>
        </ProfileInfo>
      </ProfileCard>

      <EditModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  margin-top: -25rem;
  position: relative;
`;

const EditIcon = styled(FaEdit)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #192335;
  font-size: 1.5rem;

  &:hover {
    color: #007bff;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserName = styled.h2`
  font-size: 2rem;
  color: #192335;
  font-family: "Poppins", sans-serif;
`;

const UserEmail = styled.p`
  font-size: 1.5rem;
  color: #192335;
  margin: 5px 0;
  font-family: "Poppins", sans-serif;
`;

const UserPassword = styled.p`
  font-size: 1.3rem;
  color: #192335;
  margin: 5px 0;
  font-family: "Poppins", sans-serif;
`;
