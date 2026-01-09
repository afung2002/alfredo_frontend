import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Paper,
  CardHeader,
  CardActions,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector } from 'react-redux';
import { selectUserApps } from '../../redux/selectors/user.selector';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CardMedia } from '@mui/material';
import Button from '../Button';
import LockIcon from '../../assets/lock.svg';
import { useUserContext } from '../../context/userContext';

interface AppCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  path: string;
  onAdd?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
}

const AppCard: React.FC<AppCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  path,
  onAdd,
}) => {
  const navigate = useNavigate();
  const savedApps = useSelector(selectUserApps);
  const { userRole } = useUserContext();    

  const handleAppLock = (role, app) => {
    switch (app) {
      case 'fund-manager':
        return role === 'fund_manager' || role === 'admin';
      case 'limited-partner':
        return role === 'limited_partner' || role === 'admin' || role === 'fund_manager';
        
    }
  }
  const handleCardClick = () => {
    // const hasAccess = handleAppLock(userRole, id);
    const hasAccess = true;
    //remove this after testing
    hasAccess && navigate(path);
  };
  const isSaved = savedApps?.some((app) => app.title === title);

  return (
//     <Tooltip
//   title={
//     !handleAppLock(userRole, id)
//       ? 'The application is locked and only accessible to selected users'
//       : ''
//   }
//   placement="top"
//   arrow
//   componentsProps={{
//     tooltip: {
//       sx: {
//         bgcolor: 'white',
//         color: 'black',
//         boxShadow: 3,
//         fontSize: 12,
//       },
//     },
//     arrow: {
//       sx: {
//         color: 'white',
//         '&::before': {
//           boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)', // adds shadow to the arrow
//         },
//       },
//     },
//   }}
// >
      <Card
        onClick={handleCardClick}
      sx={{
        boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 4px',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        position: 'relative',
        '&:hover': {
          boxShadow: 'rgb(0 0 0 / 15%) 0px 4px 6px',
        },

      }}>
      <CardMedia
        sx={{ height: '120px' }}
        image={imageUrl}
        title={title}
      />
      {/* {
        !handleAppLock(userRole, id) &&
        <img src={LockIcon} alt="lock" className="absolute top-2 left-0 w-16" />

      } */}
      <CardContent sx={{
        p: '18px',
        flex: 1,
      }}>
        <Typography gutterBottom sx={{
          fontSize: '1rem',
          fontWeight: 500,
        }} component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '0px 5px 5px 5px' }} className="flex justify-end items-center">
        {/* <Chip
          label={
            <b>{category}</b>

          }
          size="small"
          color='primary'
          sx={{
            backgroundColor: 'grey.100',
            borderRadius: '5px',
            color: 'primary.main',
          }}
        /> */}
        <Tooltip title={isSaved ? 'This application has been added to your saved apps' : 'Add to saved apps'}>
        <IconButton
          size='large'
          // edge="end"
          className="MuiIconButton-root"
          onClick={(e) => onAdd(e)}
          sx={{
            color: 'primary.main',
            // margin: '0px 25px 8px 0px'
          }}
        >
          {isSaved ? <RemoveCircleOutlineIcon sx={{ color: '#b7b7b7' }} /> : <AddCircleOutlineIcon sx={{ color: '#b7b7b7' }} />}
        </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
    // </Tooltip>
  );
};

export default AppCard; 