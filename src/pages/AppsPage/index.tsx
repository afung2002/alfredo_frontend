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
import { useSearchParams } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';

const AppsPage = () => {
  const [searchParams] = useSearchParams();
  const clerkStatus = searchParams.get('__clerk_status');
  console.log(clerkStatus, 'clerk status')
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
    <div className='min-h-screen w-full p-4 flex-1'>
      {
        clerkStatus && (
          <SignUp />
        )
      }
      {
        !clerkStatus && (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: 'left' }}>
        Cutting-Edge Applications for Startup Investing
      </Typography>
      <Input
        type="text"
        name="searchApps"
        control={control}
        placeholder="Search Apps..."
        className="flex flex-col mb-4"
      />
      <Tabs
        className='mb-2'
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: 'none' } }}

      >
        {APPS_FILTER_TABS.map((tab) => (
          <Tab
            sx={{
              minHeight: 32,
              minWidth: 'auto',
              px: 4,
              borderRadius: '50px',
              textTransform: 'none',
              bgcolor: tab.value === selectedTab ? 'primary.main' : 'grey.200',
              color: tab.value === selectedTab ? 'white' : 'black',
              mx: 1,
              fontSize: 14,
              fontWeight: 500,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>
      <Grid container spacing={4} className="mb-4 w-full">
        {/* <div className="flex flex-col gap-4 min-w-[600px]"> */}
        {filteredCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <AppCard
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              category={card.category}
              path={card.path}
              onAdd={() => handleToggleApp(card)}
            />
          </Grid>
        ))}
        {/* </div> */}
      </Grid>
          </>
        )
      }
      
    </div>
  )
}

export default AppsPage;