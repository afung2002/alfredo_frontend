import { Box, Container } from '@mui/material';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Navigate, useNavigate } from 'react-router';
import Loader from '../../components/Loader';
import { useEffect, useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

const LandingPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { signUp, setActive } = useSignUp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const ticket = searchParams.get('__clerk_ticket');

  useEffect(() => {
    // If a Clerk ticket is present, we assume it's an invitation flow
    const handleInvite = async () => {
      if (!ticket) return;

      try {
        setVerifying(true);
        await signUp?.create({ ticket });
        await setActive({ session: signUp.createdSessionId });
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.errors?.[0]?.message || 'Failed to accept invitation.');
      } finally {
        setVerifying(false);
      }
    };

    handleInvite();
  }, [ticket]);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signUp?.create({ emailAddress: email, password });
      await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
      alert('Check your email for the verification code!');
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign-up failed.');
    }
  };
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
      {
        ticket && (
          <div>
      <h2>Custom Sign Up</h2>
      {verifying ? (
        <p>Verifying your invitation...</p>
      ) : (
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
        )
      }
      {
        !ticket && (
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
        )
      }
      
    </Box>
  )
};

export default LandingPage;