import { Box, Container } from '@mui/material';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import Loader from '@components/Loader';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LandingPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');
  console.log('user', user);
  console.log('isSignedIn', isSignedIn);
  console.log('isLoaded', isLoaded);
  console.log('useUser', useUser());

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (user && user.id && user.publicMetadata) return;    
  }, [user, isSignedIn, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
  }
    , [isSignedIn, isLoaded]);

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
        {
          ticket && (<SignUp />)
        }
        {
          !ticket && (

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
          )
        }
      </Container>

    </Box>
  )
};

export default LandingPage;