import { useState } from 'react';
import { Box, Button, Chip, Divider } from '@mui/material';

import { NavigationAvatar } from "../component";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../Redux/store';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png";
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png";
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import { update } from '../../Redux/slices/authSlice';

interface Props {
  setopen: (value: boolean) => void;
}

const ProfileFilterUI: React.FC<Props> = ({ setopen }) => {
  const { profile, _id,name,email,loading } = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState<string>('');
  const dispatch = useDispatch();

  const HandleSelect = (data: string) => {
    setFilter(data);
  };

  const HandleSetProfileTag = async () => {
    try {
      await axios.put(`${BASE_URL}/user/profileTag/${_id}/${filter}`);
      const payload = { profiletag: filter,email:email,name:name,profile:profile,_id:_id,loading:loading };
      dispatch(update(payload));
      setopen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <NavigationAvatar
          sx={{ width: "10rem", height: "10rem" }}
          coverImage={profile}
          src={
            filter === ''
              ? profile
              : filter === 'hiring'
              ? hiring
              : filter === 'opentowork'
              ? opentowork
              : profile
          }
        />
      </Box>

      <Divider>
        <Chip label="Select Filter accordingly" />
      </Divider>

      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box onClick={() => HandleSelect("")}>
          <NavigationAvatar
            sx={{ width: "5rem", height: "5rem" }}
            coverImage={profile}
            src={profile}
          />
        </Box>
        <Box onClick={() => HandleSelect("opentowork")}>
          <NavigationAvatar
            sx={{ width: "5rem", height: "5rem" }}
            coverImage={profile}
            src={opentowork}
          />
        </Box>
        <Box onClick={() => HandleSelect("hiring")}>
          <NavigationAvatar
            sx={{ width: "5rem", height: "5rem" }}
            coverImage={profile}
            src={hiring}
          />
        </Box>
      </Box>

      <Divider sx={{ marginY: "1rem" }}>Select</Divider>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={HandleSetProfileTag}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileFilterUI;
