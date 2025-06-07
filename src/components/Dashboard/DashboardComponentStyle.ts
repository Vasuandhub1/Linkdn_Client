import styled from "styled-components";
import { Box , Button,Avatar} from "@mui/material";

// Styled Components
const HomeWrapper = styled(Box)`
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const LeftSidebar = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 1rem;
  height: fit-content;
`;

const FeedSection = styled(Box)`
  flex: 2;
`;

const Sidebar = styled(Box)`
  flex: 1;
  position: sticky;
  top: 1rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled(Box)`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const PostCard = styled(Card)`
  margin-bottom: 2rem;
`;

const PostHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostActions = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
`;

const SuggestedUser = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CreatePostOptions = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin-top: 0rem;
`;

const OptionButton = styled(Button)`
  color: #666;
  font-size: 0.8rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

// Styled Components
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 0.75rem;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 300px; /* or any desired fixed height */
  object-fit: contain;
  border-radius: 8px;
`;



export {UserBox,StyledAvatar,ModalHeader,ImagePreview,HomeWrapper,OptionButton,CreatePostOptions,FeedSection,Sidebar,PostCard,PostHeader,PostActions,SuggestedUser,LeftSidebar}