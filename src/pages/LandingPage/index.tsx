import { Box, Container } from '@mui/material';
import { SignIn, useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';
import { useEffect } from 'react';

const LandingPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const tokenFetcher = async () => {
    const token = await getToken({ template: 'default' });
    return token;
  }
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
    
    const token = tokenFetcher();
    console.log('Token:', token);
  }
  , [isSignedIn, isLoaded]);
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