import { Box, Chip, Typography } from "@mui/material";
import FundUpdatesList from "@src/components/FundUpdatesList";
import Input from "@src/components/Input";
import { useGetFundUpdatesQuery } from "@src/services/api/baseApi";
import { useForm } from "react-hook-form";
import { Apps } from "@src/constants/apps";

const LimitedPartnerUpdates = () => {
  const {control} = useForm()
  const {data: updates, isLoading, error} = useGetFundUpdatesQuery()
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ mb: 1 }}>
        <Box className="flex gap-3 items-center" sx={{ mb: 1 }}>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 600, textAlign: 'left' }}>
            Updates
          </Typography>
          <Chip
            label={updates?.length}
            color="secondary"
            sx={{ fontSize: '0.875rem', fontWeight: 700, borderRadius: '4px' }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3, width: '100%' }}>
              <Input
                className="w-full"
                type="text"
                name="searchUpdates"
                placeholder="Search updates..."
                control={control}
              />
            </Box>
            <FundUpdatesList
              updates={updates}
              isLoading={isLoading}
              error={error} />
    </Box>
  )
}

export default LimitedPartnerUpdates;