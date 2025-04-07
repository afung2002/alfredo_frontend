import { Box, Container } from '@mui/material';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';

const LandingPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  if (!isLoaded) return <Loader />;
  if (isSignedIn) return navigate('/apps');
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '75%' },
        bgcolor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">

            <SignIn
              appearance={{
                elements: {
                  rootBox: {
                    margin: '0 auto',
                  },
                  card: {
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            />


      </Container>
    </Box>
  )
};

export default LandingPage;