import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Tab, Tabs, Button,
  DialogTitle,
  DialogContent,
  Dialog,
 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InvitationStatus } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  filterInvitationsByStatus,
} from '@utils/index';
import { DEFAULT_TAB,  LIMITED_PARTNERS_FILTER_TABS, LPS_SORT_OPTIONS } from '@constants/index';
import { Routes } from '@constants/routes';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { useGetLimitedPartnersQuery } from '@services/api/baseApi';
import { calculateInvitationsTotals } from '../../../../utils';
import SortDropdown from '../../../../components/SortDropdown';
import LimitedPartnersList from '@src/components/LimitedPartnersList';
import NewLimitedPartnerFundForm from '../../../../components/NewLimitedPartnerFundForm';
import FeedbackModal from '../../../../components/FeedbackModal';
import ErrorAlert from '../../../../components/ErrorAlert';


const LimitedPartners = () => {
  const { data: limitedPartnersData, isLoading: isLoadingLimitedPartners, error: errorLimitedPartners } = useGetLimitedPartnersQuery();
  const { control, watch } = useForm({
    defaultValues: {
      'searchLimitedPartners': ''
    }
  });
  const [invitations, setInvitations] = useState<any[]>([]);
  useEffect(() => {
    if (limitedPartnersData) {
      setInvitations(limitedPartnersData || []);
    }
  }, [limitedPartnersData]);

  const searchValue = watch('searchLimitedPartners');
  const [filteredLimitedPartners, setFilteredLimitedPartners] = useState<any[]>(invitations || []);
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB);
  const [sortOption, setSortOption] = useState<string>('recent');
  const [isLimitedPartnerModelOpen, setIsLimitedPartnerModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(Routes.FUND_MANAGER_NEW_INVESTMENT);
  };

  useEffect(() => {
    if (limitedPartnersData) {
    
      setFilteredLimitedPartners(limitedPartnersData || []);
    }
  }, [limitedPartnersData]);
  useEffect(() => {
    if (searchValue) {
      const filtered = filteredLimitedPartners?.filter(lp =>
        lp.name.toLowerCase()?.includes(searchValue.toLowerCase())
      );
      setFilteredLimitedPartners(filtered || []);
    } else {
      setFilteredLimitedPartners(limitedPartnersData || []);
    }
  }, [searchValue,]);
  useEffect(() => {
    let lps = [...(limitedPartnersData || [])];

    // if (selectedTab === 'pending') {
    //   lps = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.PENDING);
    // } else if (selectedTab === 'registered') {
    //   lps = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.REGISTERED);
    // } else if (selectedTab === 'expired') {
    //   lps = filterInvitationsByStatus(invitationsToFilter, InvitationStatus.EXPIRED);
    // }

    // Apply search filtering
    if (searchValue) {
      lps = lps.filter((lp) =>
        lp.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply sort
    setFilteredLimitedPartners(sortInvitations(lps));
  }, [selectedTab, limitedPartnersData, searchValue, sortOption]);

  const sortInvitations = (invitations: any[]) => {
    if (sortOption === 'recent') {
      return [...invitations].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }

    if (sortOption === 'alphabetical') {
      return [...invitations].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOption === 'investment') {
      return [...invitations].sort((a, b) => Number(b.amount) - Number(a.amount));
    }

    return invitations;
  };
  if (isLoadingLimitedPartners) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorLimitedPartners) {
    return (
      <ErrorAlert error={errorLimitedPartners} />
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


      <LimitedPartnersList
        limitedPartners={filteredLimitedPartners}
        isLoading={isLoadingLimitedPartners}
        page='LimitedPartners'
      />
      <Dialog open={isLimitedPartnerModelOpen} onClose={() => setIsLimitedPartnerModalOpen(false)}>
        <DialogTitle>Add Limited Partner</DialogTitle>
        <DialogContent>
          <NewLimitedPartnerFundForm 
          openFeedbackModal={() => setIsFeedbackModalOpen(true)}
          closeModal={() => setIsLimitedPartnerModalOpen(false)} />
        </DialogContent>
      </Dialog>
      <FeedbackModal
      open={isFeedbackModalOpen}
      setIsFeedbackModalOpen={setIsFeedbackModalOpen}
      title="Invite Sent!"
      buttonText="Got it"
    >
      <Typography>Your invitation has been sent </Typography>
    </FeedbackModal>
    </Box>
  );
};

export default LimitedPartners;