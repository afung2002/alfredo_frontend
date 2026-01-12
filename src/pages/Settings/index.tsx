import { Box, Typography } from "@mui/material";
// import { UserProfile } from "@clerk/clerk-react";

const Settings = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 500,
        }}
      >
        Settings
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Clerk user profile is disabled for demo purposes.
      </Typography>

      {/* <UserProfile
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              margin: "0 auto",
            },
          },
        }}
      /> */}
    </Box>
  )
}

export default Settings;