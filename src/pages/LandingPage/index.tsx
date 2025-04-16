import { Box, Container } from '@mui/material';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Navigate, useNavigate } from 'react-router';
import Loader from '../../components/Loader';
import { useEffect } from 'react';

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
  }
  , [isSignedIn, isLoaded]);
  const navigate = useNavigate();
  if (!isLoaded) return <Loader />;
  if (isSignedIn) return <Navigate to="/apps" />;

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