import styled from "styled-components";
import { Card, CardContent, Avatar,  Button, IconButton } from '@mui/material';

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: var(--main-bg-color);
`;

const ProfileCard = styled(Card)`
  width: 900px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.1);
  position: relative;
`;

const Banner = styled.div<{coverImage:string}>`
  height: 250px;
  background: ${({ coverImage }) => 
    `url(${coverImage || 'https://via.placeholder.com/900x250'}) no-repeat center center`};
  background-size: cover;
  position: relative;

`;

const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background-color: var(--cover-profile-bg-color);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
`;

const CoverButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: #333 !important;
  font-size: 0.8rem !important;
  text-transform: none !important;
`;

const ProfileAvatarContainer = styled.div`
  position: absolute;
  bottom: -75px;
  left: 30px;
`;
interface ProfileAvatarProps {
  coverImage?: string|null;
}
const ProfileAvatar = styled(Avatar)<ProfileAvatarProps>(({ coverImage }) => ({
  width: '10rem',
  height: '10rem',
  border: '4px solid white',
  borderRadius: '50%', 
  backgroundImage: `url(${coverImage || 'https://via.placeholder.com/150'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover', 
}));

const EditIconButton = styled(IconButton)`
  background-color: white !important;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
`;

const Content = styled(CardContent)`
  padding-top: 80px !important;
  position: relative;
`;

const Section = styled.div`
  margin-top: 2rem;
  position: relative;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkillChip = styled.span`
  background-color: #e1ecf4;
  color: #39739d;
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 0.5rem;
  font-size: 0.9rem;
`;
 const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export  {ProfileAvatar,VisuallyHiddenInput,ProfileAvatarContainer,ProfileCard,SkillChip,SectionHeader,Section,Content,EditIconButton,CoverOverlay,Banner,ProfileWrapper,CoverButton}