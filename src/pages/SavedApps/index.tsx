import { useEffect, useState } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import AppCard from '@components/AppCard';
import { APPS_FILTER_TABS } from '@constants/index';
import { selectUserApps } from '@redux/selectors/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { addAppToUser } from '../../redux/slices/user';
import { AppType } from '../../types';
import { searchByTitle } from '../../utils/uiUtils';

const SavedApps = () => {
  const savedApps = useSelector(selectUserApps);
  const dispatch = useDispatch();
  const [filteredCards, setFilteredCards] = useState(savedApps);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredCards = savedApps?.filter((card) => {
      if (selectedTab === 'all') return true;
      return card.categoryValue === selectedTab;
    });
    setFilteredCards(filteredCards || null);
    setSearchTerm('');
  }, [selectedTab, savedApps]);

  const handleToggleApp = (card: AppType) => {
    dispatch(addAppToUser(card))
  };
  return (
    <div className='min-h-screen w-full p-4 flex-1'>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: 'left' }}>
        Cutting-Edge Applications for Startup Investing
      </Typography>
      <TextField
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          const filteredCards = searchByTitle(savedApps || [], e.target.value, 'title');
          setFilteredCards(filteredCards);
        }}
        fullWidth
        placeholder="Search applications..."
        variant="outlined"
        sx={{
          mb: 2,
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.10)",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "28px",
            height: "36px",
          },
        }}
      />

      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          mb: 1,
          minHeight: '36px',
          '& .MuiTabs-flexContainer': {
            gap: 1,
          },
          '& .MuiTab-root': {
            minHeight: '32px',
            padding: '6px 16px',
            borderRadius: '16px',
            fontSize: '0.875rem',
            textTransform: 'none',
            border: '1px solid transparent',
            '&.Mui-selected': {
              border: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              backgroundColor: 'transparent',
              color: 'black',
            },
          },
        }}
      >
        {APPS_FILTER_TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>

      <div className="flex flex-col gap-2 min--[600px]">
        {filteredCards?.map((card, index) => (
          <AppCard
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            category={card.category}
            path={card.path}
            onAdd={() => handleToggleApp(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default SavedApps;