import  { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  ProfileAvatar,
  ProfileAvatarContainer,
  ProfileCard,
  SkillChip,
  SectionHeader,
  Section,
  Content,
  EditIconButton,
  CoverOverlay,
  Banner,
  ProfileWrapper,
  CoverButton,
} from './ProfileComponentStyle';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import AlertDialougeSlide from './AlertDialougeSlide';
import opentowork from '../../../src/assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png';
import hiring from '../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png';
import type { RootState } from '../../Redux/store';

interface Experience {
  company: string;
  start: string;
  end: string;
}

interface ProfileInfo {
  description?: string;
  skills?: string[];
  experience?: Experience[];
  // You can add other optional fields if needed
}

const Profile = () => {
  const { name, email, profile, _id, profiletag } = useSelector(
    (state: RootState) => state.auth
  );

  const [ProfileData, SetProfileData] = useState<ProfileInfo | null>(null);
  const [open, SetOpen] = useState<boolean>(false);
  const [Purpose, SetPurpose] = useState<string|null>();

  const HandleGetData = async () => {
    try {
      if (_id) {
        const res = await axios.get(`${BASE_URL}/user/${_id}`, {
          withCredentials: true,
        });
        SetProfileData({ ...res?.data?.data });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const HandleEdit = (purpose: string) => {
    SetPurpose(purpose);
    SetOpen(true);
  };

  useEffect(() => {
    HandleGetData();
  }, [open, _id]);

  const formatDate = (date?: string) => (date ? date.slice(0, 7) : 'Present');

  return (
    <ProfileWrapper>
      <ProfileCard>
    <AlertDialougeSlide
  open={open}
  setopen={SetOpen}
  purpose={Purpose ?? null}
  data={{
    skills: ProfileData?.skills ?? [],
    experience: ProfileData?.experience ?? [],
  }}
/>


        <Banner coverImage={profile || ''}>
          <CoverOverlay>
            <CoverButton startIcon={<CameraAltIcon />}>Edit Cover Photo</CoverButton>
          </CoverOverlay>

          <ProfileAvatarContainer onClick={() => HandleEdit('profile')}>
            <ProfileAvatar
              sx={{ width: '12rem', height: '12rem', position: 'relative', top: '3rem' }}
              coverImage={profile}
              src={
                profiletag === ''
                  ? profile
                  : profiletag === 'hiring'
                  ? hiring
                  : profiletag === 'opentowork'
                  ? opentowork
                  : profile
              }
              alt="Vasu Singh"
            />
          </ProfileAvatarContainer>
        </Banner>

        <Content>
          <Section>
            <SectionHeader>
              <div>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {email}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {ProfileData?.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Indore, Madhya Pradesh, India · 500+ connections
                </Typography>
              </div>

              <EditIconButton onClick={() => HandleEdit('description')} size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Box mt={2}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                Message
              </Button>
              <Button variant="outlined" color="primary">
                Connect
              </Button>
            </Box>
          </Section>

          <Section>
            <SectionHeader>
              <Typography variant="h6">Experience</Typography>
              <EditIconButton onClick={() => HandleEdit('experience')} size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>

            {ProfileData?.experience?.map((elem, index) => (
              <Box key={index}>
                <Typography variant="body1">{elem.company}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(elem.start)} - {formatDate(elem.end)}
                </Typography>
              </Box>
            ))}
          </Section>

          <Section>
            <SectionHeader>
              <Typography variant="h6">Skills</Typography>
              <EditIconButton onClick={() => HandleEdit('skills')} size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>

            {ProfileData?.skills?.length ? (
              ProfileData.skills.map((skill, index) => (
                <SkillChip key={index}>{skill}</SkillChip>
              ))
            ) : (
              <SkillChip>Add some skills to showcase</SkillChip>
            )}
          </Section>

          <Section>
            <SectionHeader>
              <Typography variant="h6">Education</Typography>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Typography variant="body1">Bachelor of Technology (B.Tech)</Typography>
            <Typography variant="body2" color="textSecondary">
              XYZ University, 2020 - 2024
            </Typography>
          </Section>
        </Content>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;
