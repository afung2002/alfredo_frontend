import { Box, Chip } from '@mui/material';

const FixtureModeBadge = () => {
  const useFixtures = import.meta.env.VITE_USE_FIXTURES === 'true';
  
  if (!useFixtures) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Chip
        label="🔧 Fixture Mode"
        color="warning"
        size="small"
        sx={{
          fontWeight: 'bold',
          boxShadow: 2,
        }}
      />
    </Box>
  );
};

export default FixtureModeBadge;
