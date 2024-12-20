import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const auth = useSelector((store) => store.UserReducer.isAuth);
  const location = useLocation();

  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
