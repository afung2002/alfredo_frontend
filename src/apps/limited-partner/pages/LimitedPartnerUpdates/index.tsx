import { Box, Chip, Typography } from "@mui/material";
import FundUpdatesList from "@src/components/FundUpdatesList";
import Input from "@src/components/Input";
import { useGetFundUpdatesQuery } from "@src/services/api/baseApi";
import { useForm } from "react-hook-form";
import { Apps } from "@src/constants/apps";
import { useEffect, useState } from "react";
import SortDropdown from "../../../../components/SortDropdown";
import { FUND_UPDATES_SORT_OPTIONS } from "../../../../constants";

const LimitedPartnerUpdates = () => {
  const { control, watch } = useForm({
    defaultValues: {
      searchUpdates: ''
    }
  });

  const { data: updatesData, isLoading, error } = useGetFundUpdatesQuery();

  const searchValue = watch('searchUpdates');
  const [filteredUpdates, setFilteredUpdates] = useState(updatesData || []);
  const [sortOption, setSortOption] = useState<string>('recent');

  // Search + Sort useEffect
  useEffect(() => {
    if (!updatesData) return;

    let updatedUpdates = [...updatesData];

    // Step 1: Filter
    if (searchValue) {
      updatedUpdates = updatedUpdates.filter(update =>
        update.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Step 2: Sort
    switch (sortOption) {
      case 'alphabetical':
        updatedUpdates.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        updatedUpdates.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
    }
    setFilteredUpdates(updatedUpdates);
  }, [searchValue, updatesData, sortOption]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.334', fontWeight: 500 }}>
            {updatesData?.length || 0} Updates
          </Typography>
        </Box>
      </Box>

      {/* Search + Sort */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, width: '100%', justifyContent: 'space-between' }}>
        <Input
          rounded
          className="w-full"
          type="text"
          name="searchUpdates"
          placeholder="Search updates..."
          control={control}
        />

        <SortDropdown
          options={FUND_UPDATES_SORT_OPTIONS}
          value={sortOption}
          onChange={setSortOption}
        />
      </Box>

      {/* List */}
      <FundUpdatesList
        updates={filteredUpdates}
        isLoading={isLoading}
        error={error}
      />
    </Box>
  );
};

export default LimitedPartnerUpdates;