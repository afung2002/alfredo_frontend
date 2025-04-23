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
interface AppCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  path: string;
  onAdd?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  imageUrl,
  category,
  path,
  onAdd,
}) => {
  const navigate = useNavigate();
  const savedApps = useSelector(selectUserApps);
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(path);
  };
  const isSaved = savedApps?.some((app) => app.title === title);
  return (
    // <Paper
    //   onClick={handleCardClick}
    //   sx={{
    //     width: '100%',
    //     height: 100,
    //     display: 'flex',
    //     alignItems: 'center',
    //     cursor: 'pointer',
    //     borderRadius: 2,
    //     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    //     overflow: 'hidden',
    //     backgroundColor: '#FFF',

    //     '&:hover': {
    //       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    //     },
    //   }}
    // >
    //   {/* Image Container */}
    //   <Box
    //     sx={{
    //       width: 120,
    //       height: '100%',
    //       flexShrink: 0,
    //       // backgroundColor: 'grey.100',
    //       overflow: 'hidden',
    //     }}
    //   >
    //     <Box
    //       component="img"
    //       src={imageUrl}
    //       alt={title}
    //       sx={{
    //         width: '100%',
    //         height: '100%',
    //         objectFit: 'cover',
    //       // backgroundColor: 'grey.100',

    //       }}
    //     />
    //   </Box>

    //   {/* Content */}
    //   <CardContent
    //     sx={{
    //       flex: 1,
    //       display: 'flex',
    //       alignItems: 'flex-start',
    //       gap: 2,
    //       py: 2,
    //       px: 3,
    //       '&:last-child': { pb: 2 },
    //     }}
    //   >
    //     {/* Text Content */}
    //     <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
    //       <Typography 
    //         variant="body2" 
    //         sx={{ 
    //           fontWeight: 700, 
    //           mb: 0.3,
    //           width: '100%',
    //           textAlign: 'left'
    //         }}
    //       >
    //         {title}
    //       </Typography>
    //       <Typography 
    //         variant="body2" 
    //         color="textSecondary"
    //         sx={{
    //           width: '100%',
    //           textAlign: 'left'
    //         }}
    //       >
    //         {description}
    //       </Typography>
    //     </Box>

    //     {/* Category and Add Button */}
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         gap: 2,
    //         flexShrink: 0,
    //       }}
    //     >
    //       <Chip
    //         label={category}
    //         size="small"
    //         sx={{
    //           backgroundColor: 'grey.100',
    //           borderRadius: '5px',
    //           color: 'primary.main',
    //         }}
    //       />
    //       <IconButton
    //         className="MuiIconButton-root"
    //         onClick={onAdd}
    //         sx={{
    //           color: 'primary.main',
    //         }}
    //       >
    //         {isSaved ? <RemoveCircleOutlineIcon color="action" /> : <AddCircleOutlineIcon />}
    //       </IconButton>
    //     </Box>
    //   </CardContent>
    // </Paper>
    <Card sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      backgroundColor: '#FFF',

    }}>
      <CardMedia
        sx={{ height: '150px' }}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between items-center">
        <Chip
          label={category}
          size="small"
          sx={{
            backgroundColor: 'grey.100',
            borderRadius: '5px',
            color: 'primary.main',
          }}
        />
        <IconButton
          className="MuiIconButton-root"
          onClick={onAdd}
          sx={{
            color: 'primary.main',
          }}
        >
          {isSaved ? <RemoveCircleOutlineIcon color="action" /> : <AddCircleOutlineIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AppCard; 