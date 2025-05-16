import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import FundListCard from '@components/FundListCard';
import { Fund } from '../../../../types';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import { useGetFundsQuery } from '@services/api/baseApi';
import { calculateFundTotals, formatNumberString } from '@utils/index';
import { AnimatePresence, motion } from 'framer-motion';
import { Apps } from '@constants/apps';
import SortDropdown from '../../../../components/SortDropdown';
import { FUNDS_SORT_OPTIONS } from '../../../../constants';
import ErrorAlert from '../../../../components/ErrorAlert';

const LimitedPartnerFunds = () => {
  const { data: fundsData, isLoading, error } = useGetFundsQuery();

  const { control, watch } = useForm({
    defaultValues: {
      'searchFunds': ''
    }
  });

  const searchValue = watch('searchFunds');
  const [funds, setFunds] = useState<Fund[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<string>('recent');
  useEffect(() => {
    setSearchQuery(searchValue)
  }, [searchValue]);

  const { totalFundSize, totalEstimatedValue } = calculateFundTotals(fundsData || []);
  useEffect(() => {
    if (!fundsData) return;
  
    let updatedFunds = [...fundsData];
  
    // Step 1: Filter by search
    if (searchValue) {
      updatedFunds = updatedFunds.filter(fund =>
        fund.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  
    // Step 2: Sort by selected option
    switch (sortOption) {
      case 'alphabetical':
        updatedFunds.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'amount':
        updatedFunds.sort((a, b) => Number(b.fund_size) - Number(a.fund_size)); // Adjust key if needed
        break;
      case 'recent':
      default:
        updatedFunds.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
    }
  
    setFunds(updatedFunds);
  }, [searchValue, fundsData, sortOption]);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
        <ErrorAlert error={error} />
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
        <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
        {fundsData?.length} Funds
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalFundSize)} AUM
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalEstimatedValue)} est value
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          rounded
          type="text"
          name="searchFunds"
          control={control}
          placeholder="Search funds..."
          className="flex flex-col w-full"
        />
      </Box>
      <div className="flex gap-2 items-center justify-end">
              <SortDropdown options={FUNDS_SORT_OPTIONS} value={sortOption}
                onChange={setSortOption}
                />
            </div>
      {!isLoading && funds && funds?.length > 0 ? (
        <AnimatePresence mode="popLayout">
          {
            funds.map((fund, index) => (
              <motion.div
                key={fund.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FundListCard fund={fund} />
              </motion.div>
            ))
          }

        </AnimatePresence>

      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No funds found.
        </Typography>
      )}
    </Box>
  );
}

export default LimitedPartnerFunds;