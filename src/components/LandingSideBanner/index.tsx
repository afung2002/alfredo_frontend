import Logo from '@assets/predictiveLogo.svg'
import LoginGraphics from '@assets/loginGraphic.png'
import { Box, Typography } from '@mui/material'
const LandingSideBanner = () => {
  return (
    <Box
    sx={{
      width: '25%',
      bgcolor: 'black',
      display: { xs: 'none', md: 'flex' }, // Hide on mobile, flex on desktop
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 3,
    }}
  >
    <img 
      src={Logo}
      alt="Predictive Logo"
      className="w-3/4 h-auto mb-4"
    />
    <Typography
      variant="h6"
      sx={{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'light',
        lineHeight: 1.4,
        marginBottom: 4,
      }}
    >
      Cutting-Edge AI Agents
      <br />
      for Startup Investing
    </Typography>
    
    {/* Icons stacked vertically */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <img 
        src={LoginGraphics}
        alt="Fund Intros"
        className="w-3/4 h-auto"
      />

    </Box>
  </Box>
  )
}  

export default LandingSideBanner