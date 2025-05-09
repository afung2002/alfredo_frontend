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
  onAdd?: () => void;
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
  const isAdmin = userRole === 'admin';
  const isFundManager = userRole === 'fund_manager';
  const isLimitedPartner = userRole === 'limited_partner';
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    console.log(id, isAdmin, isFundManager, isLimitedPartner);
    // according to the app card id, check if the user has access to the app
    if (id === 'fund-manager' && !(isFundManager || isAdmin)) {
      console.log('fund manager');
      return;
    }
    if (id === 'limited-partner' && !(isLimitedPartner || isAdmin || isFundManager)) {
      console.log('limited partner');
      return;
    }
    console.log(path);
    navigate(path);
  };
  const isSaved = savedApps?.some((app) => app.title === title);



  return (
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
      {
        (id !== 'fund-manager' && id !== 'limited-partner') &&
        <img src={LockIcon} alt="lock" className="absolute top-2 left-0 w-16" />

      }
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
        <IconButton
          size='large'
          // edge="end"
          className="MuiIconButton-root"
          onClick={onAdd}
          sx={{
            color: 'primary.main',
            // margin: '0px 25px 8px 0px'
          }}
        >
          {isSaved ? <RemoveCircleOutlineIcon sx={{ color: '#b7b7b7' }} /> : <AddCircleOutlineIcon sx={{ color: '#b7b7b7' }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AppCard; 