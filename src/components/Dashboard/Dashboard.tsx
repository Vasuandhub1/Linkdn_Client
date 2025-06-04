import React from 'react'
import { Box, Typography, Avatar, Button, Grid,CardContent,Card, IconButton } from '@mui/material';
import {HomeWrapper,OptionButton,CreatePostOptions,FeedSection,Sidebar,PostCard,PostHeader,PostActions,SuggestedUser,LeftSidebar} from "./DashboardComponentStyle"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
function Dashboard() {
  return (
         <HomeWrapper>
      <LeftSidebar>
        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Your Shortcuts</Typography>
          <Typography variant="body2" mb={1}>#reactjs</Typography>
          <Typography variant="body2" mb={1}>#developer-life</Typography>
          <Typography variant="body2">#job-updates</Typography>
        </Card>

        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Groups</Typography>
          <Typography variant="body2" mb={1}>Full Stack Devs</Typography>
          <Typography variant="body2">LinkedIn Coders</Typography>
        </Card>
      </LeftSidebar>

      <FeedSection>
        <Card style={{ marginBottom:'2rem',borderRadius:"1rem" }}>
          <Box display="flex" gap={2} padding={2} alignItems="center" mb={1}>
            <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
            <Button
              variant="outlined"
              fullWidth
              sx={{ borderRadius: '20px', justifyContent: 'flex-start', color: '#666' }}
            >
              Start a post
            </Button>
          </Box>
          <CreatePostOptions>
            <OptionButton startIcon={<PhotoIcon />} size='large' color='success'>Photo</OptionButton>
            <OptionButton startIcon={<VideoCallIcon />} size='large' color='error'>Video</OptionButton>
            <OptionButton startIcon={<WorkIcon />} size='large' color='secondary'>Job</OptionButton>
            <OptionButton startIcon={<ArticleIcon />} size='large' color='warning'>Write Article</OptionButton>
          </CreatePostOptions>
        </Card>

        {[1, 2, 3].map((post) => (
          <PostCard key={post}>
            <PostHeader>
              <Box display="flex" gap={2} alignItems="center">
                <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
                <Box>
                  <Typography variant="subtitle1">Vasu Singh</Typography>
                  <Typography variant="caption" color="textSecondary">Software Developer at Hotwax</Typography>
                </Box>
              </Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </PostHeader>

            <Box mt={2}>
              <Typography variant="body1">
                Excited to share my latest project — a MERN-stack based coding platform with live multiplayer support!
              </Typography>
            </Box>

            <PostActions>
              <Button startIcon={<ThumbUpOffAltIcon />} size="medium" color='secondary'>Like</Button>
              <Button startIcon={<MessageOutlinedIcon />} size="medium" color='success'>Comment</Button>
              <Button startIcon={<ShareOutlinedIcon />} size="medium" color='warning'>Share</Button>
            </PostActions>
          </PostCard>
        ))}
      </FeedSection>

      <Sidebar>
        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Suggested for you</Typography>
          <SuggestedUser>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://randomuser.me/api/portraits/women/65.jpg" />
              <Typography variant="body2">Anjali Arora</Typography>
            </Box>
            <Button size="small" variant="outlined">Connect</Button>
          </SuggestedUser>
          <SuggestedUser>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://randomuser.me/api/portraits/men/22.jpg" />
              <Typography variant="body2">Dhruv Rathee</Typography>
            </Box>
            <Button size="small" variant="outlined">Connect</Button>
          </SuggestedUser>
        </Card>

        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Trending News</Typography>
          <Typography variant="body2" gutterBottom>India’s tech hiring sees a 20% rise in Q2 2025.</Typography>
          <Typography variant="body2" gutterBottom>React 19 beta released with server actions support.</Typography>
          <Typography variant="body2">Startup ecosystem in Indore gains national traction.</Typography>
        </Card>
      </Sidebar>
    </HomeWrapper>
  )
}

export default Dashboard
