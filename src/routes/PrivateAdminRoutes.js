import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (!!user && user.role === 'admin') || user.role === 'profesor' ? (
    children
  ) : (
    <Navigate to="/access/login" />
  );
};
