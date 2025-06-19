import styled from "styled-components";
import { Avatar, InputBase, 
} from '@mui/material';
import {  alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

const Search = styled.div<{ theme: Theme }>(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));


// SearchIconWrapper
const SearchIconWrapper = styled.div<{ theme: Theme }>(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// StyledInputBase
const StyledInputBase = styled(InputBase)<{ theme: Theme }>(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%',
}));

interface NaviAva{
  coverImage?:string|null
  ProfileSize?:number
}

const NavigationAvatar = styled(Avatar)<NaviAva>(({coverImage,ProfileSize})=>({
    width: `${ProfileSize}rem`,
  height: `${ProfileSize}rem`,
  border: '4px solid white',
  borderRadius: '50%', 
  backgroundImage: `url(${coverImage || 'https://via.placeholder.com/150'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover', 
}))

export {Search,SearchIconWrapper,StyledInputBase,NavigationAvatar}