import { useEffect } from 'react';
import AppRoutes from './components/Routes/AppRoutes';
import { useAppDispatch } from './hook/useAppDispatch';
import { checkAuthStatus } from './store/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
