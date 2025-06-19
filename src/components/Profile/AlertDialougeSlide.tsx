import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Card,
  CardContent,
  Tab,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SkillChip, VisuallyHiddenInput } from "./ProfileComponentStyle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../Redux/slices/authSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BASE_URL } from "../../Baseurl";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { RootState } from "../../Redux/store";
import ProfilePhotoFilter from "./ProfilePhotoFilter";

interface Props {
  open: boolean;
  setopen: (open: boolean) => void;
  purpose: string|null;
  data: {
    skills: string[];
    experience: { company: string; start: string; end: string }[];
  };
}

export default function AlertDialogSlide({ open, setopen, purpose, data }: Props) {
  const [Skills, SetSkills] = useState<string>("");
  const [Description, SetDescription] = useState<string>("");
  const dispatch = useDispatch();
  const { _id,profiletag,name,email,loading } = useSelector((state: RootState) => state.auth);
  const [Experience, SetExperience] = useState({
    company: "",
    start: "",
    end: ""
  });
  const [File, SetFile] = useState<File | null>(null);
  const [loader, Setloader] = useState(false);
  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSkills = async () => {
    try {
      const temp = [...(data?.skills || []), ...Skills.split(",")];
      Setloader(true);
      const res = await axios.put(`${BASE_URL}/user/${_id}`, { skills: temp }, { withCredentials: true });
      if (res) Setloader(false);
      SetSkills("");
      setopen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDescription = async () => {
    try {
      Setloader(true);
      const res = await axios.put(`${BASE_URL}/user/${_id}`, { description: Description }, { withCredentials: true });
      if (res) Setloader(false);
      SetDescription("");
      setopen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleExperience = async () => {
    try {
      if (Experience.company && Experience.end && Experience.start) {
        const temp = [...(data?.experience || []), Experience];
        Setloader(true);
        const res = await axios.put(`${BASE_URL}/user/${_id}`, { experience: temp }, { withCredentials: true });
        if (res) Setloader(false);
        setopen(false);
      } else {
        alert("Please fill all the details");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleProfile = async () => {
    try {
      if (!File) return;
      const formdata = new FormData();
      formdata.append("file", File);
      Setloader(true);
      const res = await axios.put(`${BASE_URL}/user/${_id}`, formdata, { withCredentials: true });
      const payload = { profile: res?.data?.data?.temp ,profiletag,name,email,_id,loading};
      dispatch(update(payload));
      if (res) {
        Setloader(false);
        SetFile(null);
      }
      setopen(false);
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <Dialog open={open} keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogTitle>Edit Profile Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </DialogContentText>

        {purpose === "profile" && (
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Upload Profile" value="1" />
                  <Tab label="Filters" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {!File ? "Upload Profile Photo" : File.name}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      SetFile(event.target.files?.[0] || null)
                    }
                  />
                </Button>
                <Button variant="outlined" disabled={loader} onClick={HandleProfile}>
                  Upload New
                </Button>
              </TabPanel>
              <TabPanel value="2">
                <ProfilePhotoFilter setopen={setopen} />
              </TabPanel>
            </TabContext>
          </Box>
        )}

        {purpose === "description" && (
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Description"
              fullWidth
              variant="standard"
              value={Description}
              onChange={(e) => SetDescription(e.target.value)}
            />
            <Button onClick={HandleDescription} disabled={loader} variant="contained">
              Submit
            </Button>
          </DialogContent>
        )}

        {purpose === "experience" && (
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Designation and Company Name"
              fullWidth
              variant="standard"
              value={Experience.company}
              onChange={(e) => SetExperience({ ...Experience, company: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                onChange={(newValue) => SetExperience({ ...Experience, start: newValue?.toISOString() || "" })}
              />
              <DatePicker
                label="End Date"
                onChange={(newValue) => SetExperience({ ...Experience, end: newValue?.toISOString() || "" })}
              />
            </LocalizationProvider>
            <Button onClick={HandleExperience} variant="contained" disabled={loader}>
              Submit
            </Button>
            <Card>
              {data?.experience?.map((elem, index) => (
                <CardContent key={index}>
                  <Typography variant="body1">{elem.company}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start: {elem.start?.substr(0, 10)} End: {elem.end?.substr(0, 10)}
                  </Typography>
                </CardContent>
              ))}
            </Card>
          </DialogContent>
        )}

        {purpose === "skills" && (
          <DialogContent>
            <TextField
              onChange={(e) => SetSkills(e.target.value)}
              autoFocus
              required
              margin="dense"
              label="Skills (comma separated)"
              fullWidth
              variant="standard"
              value={Skills}
            />
            <Button onClick={handleSkills} variant="contained" disabled={loader}>
              Add
            </Button>
            <Card>
              <CardContent>
                {data?.skills?.length === 0 ? (
                  <SkillChip>Add some skills to showcase</SkillChip>
                ) : (
                  data?.skills?.map((elem, index) => <SkillChip key={index}>{elem}</SkillChip>)
                )}
              </CardContent>
            </Card>
          </DialogContent>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Disagree</Button>
      </DialogActions>
    </Dialog>
  );
}
