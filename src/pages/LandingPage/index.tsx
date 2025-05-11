import { Box, Container } from '@mui/material';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import Loader from '@components/Loader';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAcceptLimitedPartnerInvitationMutation, useCreateFundLimitedPartnerMutation } from '@services/api/baseApi';
import { Routes } from '../../constants/routes';

const LandingPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useAcceptLimitedPartnerInvitationMutation();
  const [createFundLimitedPartner, { isLoading: creatingFundLP }] =
    useCreateFundLimitedPartnerMutation();

  useEffect(() => {
    // if (!isLoaded || !isSignedIn || hasCreatedLP || !ticket) return;

    if (!ticket) return;

    const createLimitedPartnerAfterSignup = async () => {
      console.log('createLimitedPartnerAfterSignup');
      if (user.publicMetadata) {
        console.log('user.publicMetadata', user.publicMetadata);
        const fund = user.publicMetadata.fund_name as string | undefined;
        const fund_id = user.publicMetadata.fund_id as number | undefined;
        const name = user.publicMetadata.name as string | undefined;
        const email = user.emailAddresses[0].emailAddress as string | undefined;
        const limited_partner = user.id;
        const invested_amount = user.publicMetadata.invested_amount as string | undefined;
        console.log('User:', user);
          console.log('Creating fund limited partner');
          try {
            await createFundLimitedPartner({
              fund: fund_id,
              limited_partner,
              invested_amount,
            }).unwrap();

          } catch (error) {
            console.error('Error creating limited partner after sign up:', error);
          }
      }
    };

    createLimitedPartnerAfterSignup();
  }, [ticket]);

  if (!isLoaded || creatingLP ) {
    return <Loader />;
  }


  if (isSignedIn) {
    return <Navigate to={Routes.APPS} />;
  }

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
          forceRedirectUrl={Routes.APPS}  
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
