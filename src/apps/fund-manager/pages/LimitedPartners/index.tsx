import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Tab, Tabs, Button,
  DialogTitle,
  DialogContent,
  Dialog,
 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InvestmentDetails, InvestmentType, InvitationStatus } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  filterInvestmentsByType,
  filterInvitationsByStatus,
  getClerkToken
} from '@utils/index';
import { DEFAULT_TAB, INVESTMENTS_SORT_OPTIONS, LIMITED_PARTNERS_FILTER_TABS, LPS_SORT_OPTIONS } from '@constants/index';
import { Routes } from '@constants/routes';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import InvestmentsList from '@src/components/InvestmentsList';
import { useGetInvestmentsQuery, useGetInvitationsGroupedByEmailQuery, useGetInvitationsQuery, useGetLimitedPartnersQuery } from '@services/api/baseApi';
import { calculateInvitationsTotals, formatNumberString } from '../../../../utils';
import { InvestmentResponse } from '../../../../services/api/baseApi/types';
import SortDropdown from '../../../../components/SortDropdown';
import LimitedPartnersList from '@src/components/LimitedPartnersList';
import NewLimitedPartnerFundForm from '../../../../components/NewLimitedPartnerFundForm';


const LimitedPartners = () => {
  getClerkToken();
  const { data: invitationsData, isLoading: isLoadingInvitations, error: errorInvitations } = useGetInvitationsQuery();
  const { data: limitedPartnersData, isLoading: isLoadingLimitedPartners, error: errorLimitedPartners } = useGetLimitedPartnersQuery();
  const { data: invitationsGroupedByEmailData, isLoading: isLoadingInvitationsGroupedByEmail, error: errorInvitationsGroupedByEmail } = useGetInvitationsGroupedByEmailQuery();
  console.log(invitationsGroupedByEmailData);
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
  const [isLimitedPartnerModelOpen, setIsLimitedPartnerModalOpen] = useState(false);
  const navigate = useNavigate();
  const { totalInvitations, totalPending, totalRegistered, totalExpired } = calculateInvitationsTotals(invitations || []);


  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };


  useEffect(() => {
    if (searchValue) {
      const filtered = filteredLimitedPartners?.filter(invitation =>
        invitation.public_metadata.name.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setFilteredLimitedPartners(filtered || []);
    } else {
      setFilteredLimitedPartners(invitationsGroupedByEmailData || []);
    }
  }, [searchValue,]);
  useEffect(() => {
    let invitationsToFilter = [...(invitationsGroupedByEmailData || [])];

    if (selectedTab === 'pending') {
      invitationsToFilter = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.PENDING);
    } else if (selectedTab === 'registered') {
      invitationsToFilter = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.REGISTERED);
    } else if (selectedTab === 'expired') {
      invitationsToFilter = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.EXPIRED);
    }

    // Apply search filtering
    if (searchValue) {
      invitationsToFilter = invitationsToFilter.filter((invitation) =>
        invitation.public_metadata.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sort
    setFilteredLimitedPartners(sortInvitations(invitationsToFilter));
  }, [selectedTab, invitationsGroupedByEmailData, searchValue, sortOption]);

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
  if (isLoadingInvitationsGroupedByEmail) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorInvitationsGroupedByEmail) {
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
            {invitations?.length} Limited Partners
          </Typography>

        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          {/* <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {totalRegistered} registered
          </Typography> */}
          {/* <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} /> */}
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {totalPending} pending
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {totalExpired} expired
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
          onClick={() =>navigate(Routes.FUND_MANAGER_NEW_LIMITED_PARTNER)}
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
          options={LPS_SORT_OPTIONS}
          value={sortOption}
          onChange={setSortOption}
        />
      </div>


      <LimitedPartnersList
        limitedPartners={filteredLimitedPartners}
        isLoading={isLoadingInvitations}
        page='LimitedPartners'
      />
      <Dialog open={isLimitedPartnerModelOpen} onClose={() => setIsLimitedPartnerModalOpen(false)}>
        <DialogTitle>Add Limited Partner</DialogTitle>
        <DialogContent>
          <NewLimitedPartnerFundForm 
          
          closeModal={() => setIsLimitedPartnerModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LimitedPartners;