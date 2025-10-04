import { JSX } from '@emotion/react/jsx-runtime';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hook/useAppDispatch';
import { USER_TYPE } from './PrivateHeader';

interface Props {
  allowedTypes: (typeof USER_TYPE)[keyof typeof USER_TYPE][];
  children: JSX.Element;
}

const RequireUserType = ({ allowedTypes, children }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to='/login' replace />;
  if (!allowedTypes.includes(user.tipo))
    return <Navigate to='/private' replace />;

  return children;
};

export default RequireUserType;
