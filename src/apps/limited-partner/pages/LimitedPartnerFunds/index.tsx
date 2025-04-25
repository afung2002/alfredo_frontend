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
  useEffect(() => {
    setSearchQuery(searchValue)
  }, [searchValue]);

  const { totalFundSize, totalEstimatedValue } = calculateFundTotals(fundsData || []);
  useEffect(() => {
    if (searchQuery === '') {
      setFunds(fundsData || []);
      return;
    }
    const filteredFunds = fundsData?.filter(fund =>
      fund.name.toLowerCase()?.includes(searchQuery.toLowerCase())
    ) || [];
    setFunds(filteredFunds);
  }, [searchQuery, fundsData]);
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
      <Box p={3}>
        <Typography color="error">Error loading funds</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600, textAlign: 'left' }}>
            Funds
          </Typography>
          <Chip
            label={fundsData?.length}
            color="secondary"
            sx={{ fontSize: '0.875rem', fontWeight: 700, borderRadius: '4px' }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: '475px' }}>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalFundSize)} AUM
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {formatNumberString(totalEstimatedValue)} ESV
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2, width: '100%' }}>
        <Input
          type="text"
          name="searchFunds"
          control={control}
          placeholder="Search funds..."
          className="flex flex-col w-full"
        />
      </Box>
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