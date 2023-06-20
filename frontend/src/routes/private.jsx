import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import PropTypes from "prop-types";

export function PrivateProvider({ children }) {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/" />;
}

PrivateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
