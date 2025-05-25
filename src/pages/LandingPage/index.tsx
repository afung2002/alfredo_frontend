import { Box, Container } from '@mui/material';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import Loader from '@components/Loader';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAcceptLimitedPartnerInvitationMutation, useCreateFundLimitedPartnerMutation } from '@services/api/baseApi';
import { Routes } from '../../constants/routes';
import { setTicket } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../../utils/validationUtils';
const LandingPage = () => {
  const dispatch = useDispatch();
  const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');
  const isValidTicket = ticket && validateEmail(ticket);
  const invId = searchParams.get('invitationId') || '1234';
  const role = searchParams.get('role') || 'limitedPartner';
  const email = searchParams.get('email') || 'islam.sayed8@gmail.com';
  const username = searchParams.get('username') || 'username';
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useAcceptLimitedPartnerInvitationMutation();
  const [createFundLimitedPartner, { isLoading: creatingFundLP }] =
    useCreateFundLimitedPartnerMutation();

  useEffect(() => {
    if (ticket) {
      dispatch(setTicket(ticket));
    }
  }, [ticket]);

  if (!isLoaded || creatingLP) {
    return <Loader />;
  }
  

  // if (isSignedIn) {
  //   return <Navigate to={Routes.APPS} />;
  // }
  debugger
  const lp = user?.publicMetadata?.isLimitedPartner;
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
        {invId && email && role ? (
          <SignUp 
            initialValues={{
            emailAddress: email,
            username: username,}}
            forceRedirectUrl={Routes.APPS} />
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
