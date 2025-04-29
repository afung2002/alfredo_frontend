import { Box, Container } from '@mui/material';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import Loader from '@components/Loader';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCreateFundLimitedPartnerMutation } from '@services/api/baseApi';

const LandingPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');

  const [hasCreatedLP, setHasCreatedLP] = useState(false);
  const [createLimitedPartner, { isLoading: creatingLP }] = useCreateFundLimitedPartnerMutation();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasCreatedLP) return;

    const createLimitedPartnerAfterSignup = async () => {
      if (user.publicMetadata) {
        console.log(user)
        const fund = user.publicMetadata.fund_name as number | undefined;
        const name = user.publicMetadata.name as string | undefined;
        const email = user.publicMetadata?.fund_manager_email;
        console.log('User public metadata:', user.publicMetadata);
        // Detect if user is newly invited based on existing metadata fields
        const isNewlyInvited = !!(fund);
        console.log('Is newly invited:', isNewlyInvited);
        if (isNewlyInvited) {
          try {
            await createLimitedPartner({
              limited_partner: user.id,
              invested_amount: '1000',
              fund: 42,
            }).unwrap();

            setHasCreatedLP(true); // Mark as created after API success
          } catch (error) {
            console.error('Error creating limited partner after sign up:', error);
          }
        } else {
          // Already a saved user → no need to create again
          setHasCreatedLP(true);
        }
      }
    };

    createLimitedPartnerAfterSignup();
  }, [isLoaded, isSignedIn, user, createLimitedPartner, hasCreatedLP]);

  // Show loader while user is loading, LP creation is happening, or LP not yet confirmed
  if (!isLoaded || creatingLP || (isSignedIn && !hasCreatedLP)) {
    return <Loader />;
  }

  // After sign-in + LP created successfully
  if (isSignedIn && hasCreatedLP) {
    return <Navigate to="/apps" />;
  }

  // If not signed in yet (first time landing)
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
        {ticket ? (
          <SignUp />
        ) : (
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
        )}
      </Container>
    </Box>
  );
};

export default LandingPage;
