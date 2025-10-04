import { Box } from '@mui/material';
import CtaSection from './CtaSection';
import HeroSection from './HeroSection';
import HomeProducts from './HomeProducts';
import ValoresSection from './ValoresSection';

const Index = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F9F6F0',
        textAlign: 'center',
        p: 3,
        overflow: 'hidden',
      }}
    >
      <HeroSection />
      <ValoresSection />
      <HomeProducts />
      <CtaSection />
    </Box>
  );
};

export default Index;
