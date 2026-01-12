import { Box, Container, Button, Typography } from '@mui/material';
// import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate, useNavigate } from 'react-router';
// import Loader from '@components/Loader';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useAcceptLimitedPartnerInvitationMutation, useCreateFundLimitedPartnerMutation } from '@services/api/baseApi';
import { Routes } from '../../constants/routes';
import { setInvitationId, setTicket } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';
// import { validateEmail } from '../../utils/validationUtils';
const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const ticket = searchParams.get('__clerk_ticket');
  const invitationId = searchParams.get('invitation_id');
  
  // const [createLimitedPartner, { isLoading: creatingLP }] =
  //   useAcceptLimitedPartnerInvitationMutation();
  // const [createFundLimitedPartner, { isLoading: creatingFundLP }] =
  //   useCreateFundLimitedPartnerMutation();

  useEffect(() => {
    if (ticket) dispatch(setTicket(ticket));
    if (invitationId) dispatch(setInvitationId(invitationId));
  }, [ticket, dispatch, invitationId]);

  // Bypass Clerk for demo - show simple login button
  // if (!isLoaded || creatingLP) {
  //   return <Loader />;
  // }
  

  // if (isSignedIn) {
  //   return <Navigate to={Routes.APPS} />;
  // }
  // console.log('user', user);
  // console.log('invitationId', invitationId);

  // const lp = user?.publicMetadata?.isLimitedPartner;
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
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Demo Mode</Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Clerk authentication is disabled for demo purposes
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate(Routes.APPS)}
            sx={{ minWidth: 200 }}
          >
            Continue to App
          </Button>
        </Box>
        {/* {invitationId && ticket ? (
          <SignUp 
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
        )} */}
      </Container>
    </Box>
  );
};

export default LandingPage;
