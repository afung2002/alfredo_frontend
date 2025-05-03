import { Box, Container } from '@mui/material';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import Loader from '@components/Loader';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAcceptLimitedPartnerInvitationMutation } from '@services/api/baseApi';
import { Routes } from '../../constants/routes';

const LandingPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useAcceptLimitedPartnerInvitationMutation();
  const [hasCreatedLP, setHasCreatedLP] = useState(false);
  const [isNewlyInvited, setIsNewlyInvited] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasCreatedLP || !ticket) return;

    const createLimitedPartnerAfterSignup = async () => {
      if (user.publicMetadata) {
        const fund = user.publicMetadata.fund_name as string | undefined;
        const fund_id = user.publicMetadata.fund_id as number | undefined;
        const name = user.publicMetadata.name as string | undefined;
        const email = user.emailAddresses[0].emailAddress as string | undefined;    ;
        console.log('User:', user);
        // Detect if user is newly invited based on existing metadata fields
            // const isNewlyInvited = !!(fund);
            // setIsNewlyInvited(isNewlyInvited);
        if (!hasCreatedLP) {
          try {
            await createLimitedPartner({
              email,
              name,
              fund: fund_id,
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
  }, [isLoaded, isSignedIn, user, createLimitedPartner, hasCreatedLP, ticket]);

  // Show loader while user is loading, LP creation is happening, or LP not yet confirmed
  if (!isLoaded || creatingLP || (isSignedIn && !hasCreatedLP)) {
    return <Loader />;
  }

  // After sign-in + LP created successfully
  if (isSignedIn && hasCreatedLP && !isNewlyInvited) {
    return <Navigate to={Routes.APPS} />;
  }

  if (isSignedIn && hasCreatedLP && isNewlyInvited) {
    return <Navigate to={Routes.LIMITED_PARTNER_FUNDS} />;
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
