import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTopButton from '../components/buttons/ScrollToTopButton';
import { Footer } from '../components/shared/public/Footer';
import { Header } from '../components/shared/public/Header';

const PublicLayout = () => {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh' width={'100%'}>
      <Header />
      <ScrollToTopButton />

      <Box flexGrow={1} p={2}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default PublicLayout;
