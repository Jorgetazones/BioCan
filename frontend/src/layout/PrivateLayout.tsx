import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../components/buttons/ScrollToTopButton';
import PrivateFooter from '../components/shared/private/PrivateFooter';
import PrivateHeader from '../components/shared/private/PrivateHeader';

const PrivateLayout = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh'
      width='100%'
      boxSizing='border-box'
    >
      <PrivateHeader />
      <ScrollToTopButton />

      <Box flexGrow={1} p={2} sx={{ overflowX: 'hidden' }}>
        <Outlet />
      </Box>

      <PrivateFooter />
    </Box>
  );
};

export default PrivateLayout;
