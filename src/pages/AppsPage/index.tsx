import { useEffect, useState } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  TextField,
  Grid,
} from '@mui/material';
import AppCard from '@components/AppCard';
import { APP_CARDS } from '@constants/appCards';
import { APPS_FILTER_TABS } from '@constants/index';
import { useDispatch } from 'react-redux';
import { addAppToUser } from '@redux/slices/user';
import { AppType } from '../../types';
import { searchByTitle } from '@utils/uiUtils';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { SignUp } from '@clerk/clerk-react';
import { useSignUp } from '@clerk/clerk-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UserProvider, useUserContext } from '../../context/userContext';
const AppsPage = () => {
  const { signUp, setActive } = useSignUp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userRole } = useUserContext();
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

  const { control, watch, setValue } = useForm({
    defaultValues: {
      'searchApps': ''
    }
  });
  const searchValue = watch('searchApps');
  const dispatch = useDispatch();
  const [filteredCards, setFilteredCards] = useState(APP_CARDS);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const filteredCards = APP_CARDS.filter((card) => {
      if (selectedTab === 'all') return true;
      return card.categoryValue === selectedTab;
    });
    setFilteredCards(filteredCards);
    setValue('searchApps', '');
  }, [selectedTab]);

  const handleToggleApp = (card: AppType) => {
    dispatch(addAppToUser(card))
  };

  useEffect(() => {
    const filteredCards = searchByTitle(APP_CARDS || [], searchValue, 'title');
    setFilteredCards(filteredCards);
  }, [searchValue]);

  
  return (
    
        <div className='min-h-screen w-full p-4 flex-1 mt-[55px]'>
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
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: 'left' }}>
            Professional Class AI Agents for Startup Investing
      </Typography>
      <Input
        rounded
        type="text"
        name="searchApps"
        control={control}
        placeholder="Search Apps..."
        className="flex flex-col mb-[30px]"
      />
      <Grid container spacing={4} className="mb-4 w-full">
        {filteredCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={index}>
            <AppCard
              id={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              category={card.category}
              path={card.path}
              onAdd={() => handleToggleApp(card)}
            />
          </Grid>
        ))}
      </Grid>
          </>
        )
      }
      
    </div>
  
  )
}

export default AppsPage;