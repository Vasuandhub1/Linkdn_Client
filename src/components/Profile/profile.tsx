import React from 'react';
import { Card, CardContent, Avatar, Typography, Button, IconButton, Box } from '@mui/material';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Styled Components
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f3f2ef;
`;

const ProfileCard = styled(Card)`
  width: 900px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.1);
  position: relative;
`;

const Banner = styled.div`
  height: 250px;
  background: url('https://via.placeholder.com/900x250') center/cover no-repeat;
  position: relative;
`;

const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
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

const ProfileAvatar = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  border: 4px solid white;
`;

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

const LinkedInProfilePage = () => {
  return (
    <ProfileWrapper>
      <ProfileCard>
        {/* Cover Section */}
        <Banner>
          <CoverOverlay>
            <CoverButton startIcon={<CameraAltIcon />}>Edit Cover Photo</CoverButton>
          </CoverOverlay>
          {/* Profile Avatar with Edit */}
          <ProfileAvatarContainer>
            <ProfileAvatar src="https://via.placeholder.com/150" alt="Vasu Singh" />
            <EditIconButton size="small" style={{ position: 'absolute', bottom: 0, right: -10 }}>
              <EditIcon fontSize="small" />
            </EditIconButton>
          </ProfileAvatarContainer>
        </Banner>

        {/* Profile Content */}
        <Content>
          {/* Basic Info */}
          <Section>
            <SectionHeader>
              <div>
                <Typography variant="h5">Vasu Singh</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Software Engineer | MERN Stack | React
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Indore, Madhya Pradesh, India · 500+ connections
                </Typography>
              </div>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Box mt={2}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>Message</Button>
              <Button variant="outlined" color="primary">Connect</Button>
            </Box>
          </Section>

          {/* Experience */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Experience</Typography>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Typography variant="body1">Software Engineer at Hotwax Systems</Typography>
            <Typography variant="body2" color="textSecondary">2024 - Present</Typography>
            <Typography variant="body1">Intern at Amensis Technology</Typography>
            <Typography variant="body2" color="textSecondary">2023</Typography>
          </Section>

          {/* Skills */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Skills</Typography>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <SkillChip>JavaScript</SkillChip>
            <SkillChip>React</SkillChip>
            <SkillChip>Node.js</SkillChip>
            <SkillChip>MongoDB</SkillChip>
            <SkillChip>CSS</SkillChip>
          </Section>

          {/* Education */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Education</Typography>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Typography variant="body1">Bachelor of Technology (B.Tech)</Typography>
            <Typography variant="body2" color="textSecondary">XYZ University, 2020 - 2024</Typography>
          </Section>
        </Content>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default LinkedInProfilePage;
