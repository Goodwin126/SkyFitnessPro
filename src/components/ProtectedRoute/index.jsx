import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.storage?.user) || {};

  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return children;
};
