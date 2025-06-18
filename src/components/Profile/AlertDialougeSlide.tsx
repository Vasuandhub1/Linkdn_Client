import  React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SkillChip } from "./ProfileComponentStyle";
import Card from "@mui/material/Card";
import {Typography} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from "./ProfileComponentStyle";
import CardContent from "@mui/material/CardContent";
import { BASE_URL } from "../../Baseurl";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from "react-redux";
import { update } from "../../Redux/slices/authSlice";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Box} from "@mui/material";
import type { RootState } from "../../Redux/store";
import auth from "../../Redux/slices/authSlice"
import ProfilePhotoFilter from "./ProfilePhotoFilter";

export default function AlertDialougeSlide({ open, setopen, purpose, data }) {

    const [Skills,SetSkills] =useState<string>("")
    const [Description,SetDescription] =useState<string>("")
    const dispatch = useDispatch()
    const {profile} = useSelector((state:RootState)=>state.auth)
    const {_id}= useSelector((state:RootState)=>state.auth)
    const [Experience,SetExperience]=useState({
        company:"",
        start:"",
        end:""
      })
      const [File,SetFile]=useState()
      const [loader,Setloader]= useState(false)
       const [value, setValue] = React.useState('1');

          const handleChange = (event: React.SyntheticEvent, newValue: string) => {
           setValue(newValue);
         };


    const handleSkills = async()=>{
        try{
           
            const temp =[...data?.skills,...Skills.split(",")]
            Setloader(true)
            const res = await axios.put(`${BASE_URL}/user/${_id}`,{skills:[...temp]},{withCredentials:true})
           SetSkills("")
           if(res){
            Setloader(false)
           }
           setopen(false)
        }catch(err){
            console.log(err)
            return 
        }
    }

    const HandleDescription =async ()=>{
        try{
            Setloader(true)
            const res = await axios.put(`${BASE_URL}/user/${_id}`,{description:Description},{withCredentials:true})
            
            if(res){
                Setloader(false)
            }
            SetDescription("")
            setopen(false)
        }catch(err){
            console.log(err)
        }
    }
    const HandleExperience = async()=>{
        try{
            if(Experience.company && Experience.end && Experience.start){
                const temp = [...data?.experience,Experience]
                
                Setloader(true)
                const res =await axios.put(`${BASE_URL}/user/${_id}`,{experience:[...temp]},{withCredentials:true})
                
                if(res){
                    Setloader(false)
                }
                setopen(false)
            }else{
                alert("please Fill All the details")
            }
        }catch(err){
            console.log(err)
        }
    }

    const HandleProfile = async()=>{
        try{
            const formdata = new FormData()
            formdata.append("file",File)
            Setloader(true)
            const res =  await axios.put(`${BASE_URL}/user/${_id}`,formdata,{withCredentials:true})
           
            const payload = {profile:res?.data?.data?.temp}
            dispatch(update(payload))
            if(res){
                Setloader(false)
                SetFile(null)
            }
            setopen(false)
        }catch(err){
            console.log(err,"error")
        }
    }
    
    return (
        <React.Fragment>
            <Dialog
                open={open}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit Profile Data"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending
                        anonymous location data to Google, even when no apps are running.
                    </DialogContentText>
                    {purpose === "profile"?<>

                    {/* {box element} */}
                    
                     <Box sx={{ width: '100%', typography: 'body1' }}>
                          <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Upload Profile" value="1" />
                                <Tab label="Filters" value="2" />
                                
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <Button  component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>{!File?"Upload Profile Photo":File.name}
                              <VisuallyHiddenInput
                               type="file"
                               onChange={(event:React.ChangeEvent<HTMLInputElement>) =>SetFile(event?.target?.files[0])}
                                multiple
                                  />
                                </Button> <Button variant="outlined" loading={loader} onClick={HandleProfile} > Upload New</Button>
                            </TabPanel>
                            <TabPanel value="2">
                                {/* {filter s} */}
                                 <ProfilePhotoFilter setopen={setopen}/>
                            </TabPanel>
                          </TabContext>
                        </Box>
                    
                    {/* {vox element} */}
                    
    
    </>:null}

                    {purpose === "description" ? (
                       <DialogContent>
                         <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label={purpose}
                            type="email"
                            fullWidth
                            variant="standard"
                            value={Description}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetDescription(e.target.value)}
                        />
                        <Button onClick={HandleDescription} loading={loader} variant="contained">Submit</Button>
                       </DialogContent>
                    ) : null}

                    {purpose === "experience" ? (
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label=" Designation and Company Name"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={Experience.company}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{SetExperience({...Experience,company:e.target.value})}}
                            />
                            <Button onClick={HandleExperience} variant="contained" loading={loader}>Submit</Button>
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                // value={value}
                                onChange={(newValue) => SetExperience({...Experience,start:newValue?.$d})}
                                />
                                <DatePicker
                                    label="End Date"
                                // value={value}
                                  onChange={(newValue) => SetExperience({...Experience,end:newValue?.$d})}
                                />
                            </LocalizationProvider>
                            <Card>
                                {data?.experience?.map((elem,index)=>{
                                    return (
                                        <CardContent key={index}>
                                            <Typography variant="body1">{elem.company}</Typography>
                                             <Typography variant="body2" color="textSecondary">Start:{elem.start.substr(0,10)} End:{elem.end.substr(0,10)}</Typography>
                                        </CardContent>
                                    )
                                })}
                            </Card>
                        </DialogContent>
                    ) : null}

                    {purpose === "skills" ? (
                        <DialogContent>
                            <TextField
                               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>SetSkills(e.target.value)}
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label="skills (comma seperated)"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={Skills}
                            />
                            <Button onClick={handleSkills} variant="contained" loading={loader} >Add</Button>
                            <Card>
                                <CardContent>
                                    {!data ? (
                                        <SkillChip>Add some skills to showcase</SkillChip>
                                    ) : (
                                        data?.skills?.map((elem: string, index: number) => {
                                            return <SkillChip key={index}>{elem}</SkillChip>;
                                        })
                                    )}
                                </CardContent>
                            </Card>
                        </DialogContent>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setopen(false)}>Disagree</Button>
                   
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
