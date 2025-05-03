import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InvestmentDetails, InvestmentType, InvitationStatus } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  filterInvestmentsByType,
  filterInvitationsByStatus,
  getClerkToken
} from '@utils/index';
import { DEFAULT_TAB, INVESTMENTS_SORT_OPTIONS, LIMITED_PARTNERS_FILTER_TABS } from '@constants/index';
import { Routes } from '@constants/routes';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import InvestmentsList from '@src/components/InvestmentsList';
import { useGetInvestmentsQuery, useGetInvitationsQuery } from '@services/api/baseApi';
import { calculateInvitationsTotals, formatNumberString } from '../../../../utils';
import { InvestmentResponse } from '../../../../services/api/baseApi/types';
import SortDropdown from '../../../../components/SortDropdown';
import LimitedPartnersList from '@src/components/LimitedPartnersList';


const LimitedPartners = () => {
  getClerkToken();
  const { data: invitationsData, isLoading: isLoadingInvitations, error: errorInvitations } = useGetInvitationsQuery();
  const { control, watch } = useForm({
    defaultValues: {
      'searchLimitedPartners': ''
    }
  });
  const [invitations, setInvitations] = useState<any[]>([]);
  useEffect(() => {
    if (invitationsData) {
      const limitedPartnersInvitations = 
        invitationsData?.filter((invitation) => invitation.public_metadata.role === 'limited_partner');
      setInvitations(limitedPartnersInvitations || []);
    }
  }, [invitationsData]);

  const searchValue = watch('searchLimitedPartners');
  const [filteredLimitedPartners, setFilteredLimitedPartners] = useState<any[]>(invitations || []);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);
  const [sortOption, setSortOption] = useState<string>('recent');
  const navigate = useNavigate();

  const { totalInvitations, totalPending, totalRegistered } = calculateInvitationsTotals(invitations || []);


  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };
  // useEffect(() => {
  //   if (selectedTab === 'all') {
  //     setFilteredLimitedPartners(invitations || []);
  //   } else if (selectedTab === 'pending') {
  //     setFilteredLimitedPartners(filterInvitationsByStatus(invitations || [], InvitationStatus.PENDING));
  //   } else if (selectedTab === 'registered') {
  //     console.log('selectedTab', selectedTab)
  //     console.log(filterInvitationsByStatus(invitations || [], InvitationStatus.REGISTERED))
  //     setFilteredLimitedPartners(filterInvitationsByStatus(invitations || [], InvitationStatus.REGISTERED));
  //   }
  // }, [selectedTab, invitations]);

  useEffect(() => {
    if (searchValue) {
      const filtered = filteredLimitedPartners?.filter(invitation =>
        invitation.public_metadata.name.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setFilteredLimitedPartners(filtered || []);
    } else {
      setFilteredLimitedPartners(invitations || []);
    }
  }, [searchValue,]);
  useEffect(() => {
    let invitationsToFilter = [...(invitations || [])];

    if (selectedTab === 'pending') {
      invitationsToFilter = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.PENDING);
    } else if (selectedTab === 'registered') {
      invitationsToFilter = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.REGISTERED);
    }

    // Apply search filtering
    if (searchValue) {
      invitationsToFilter = invitationsToFilter.filter((invitation) =>
        invitation.public_metadata.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sort
    setFilteredLimitedPartners(sortInvitations(invitationsToFilter));
  }, [selectedTab, invitations, searchValue, sortOption]);

  const sortInvitations = (invitations: any[]) => {
    if (sortOption === 'recent') {
      return [...invitations].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }

    if (sortOption === 'alphabetical') {
      return [...invitations].sort((a, b) => a.public_metadata.name.localeCompare(b.public_metadata.name));
    }

    if (sortOption === 'investment') {
      return [...invitations].sort((a, b) => Number(b.amount) - Number(a.amount));
    }

    return invitations;
  };
  if (isLoadingInvitations) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorInvitations) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <>
            {errorInvitations}
          </>
        </Alert>
      </Box>
    );
  }

  console.log(filteredLimitedPartners, 'filteredLimitedPartners')
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
            {invitations?.length} Limited Partners
          </Typography>

        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {totalRegistered} registered
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {totalPending} pending
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          rounded
          type="text"
          name="searchLimitedPartners"
          control={control}
          placeholder="Search limited partners..."
          className="flex flex-col w-full"
        />
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{
            flexShrink: 0,
            textTransform: "none",
            bgcolor: "black",
            color: "white",
            borderRadius: "2px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          Add New
        </Button>
      </Box>
      <div className="flex gap-2 items-center justify-between">
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons={false}
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          {LIMITED_PARTNERS_FILTER_TABS.map((tab) => (
            <Tab
              disableFocusRipple
              disableTouchRipple
              sx={{
                minHeight: 32,
                minWidth: 'auto',
                px: 4,
                borderRadius: '50px',
                textTransform: 'none',
                bgcolor: 'transparent !important', // Set background transparent
                color: 'gray',
                mx: 1,
                fontSize: 14,
                fontWeight: 600,
                border: '1px solid gray',
                '&.Mui-selected': {
                  border: '1px solid black',
                  bgcolor: 'transparent !important', // Ensure selected tab is also transparent
                  color: 'black', // Optional: change color for selected tab
                },

              }}
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
            />
          ))}
        </Tabs>
        <SortDropdown
          options={INVESTMENTS_SORT_OPTIONS}
          value={sortOption}
          onChange={setSortOption}
        />
      </div>


      <LimitedPartnersList
        limitedPartners={filteredLimitedPartners}
        isLoading={isLoadingInvitations}
        page='LimitedPartners'
      />
    </Box>
  );
};

export default LimitedPartners;