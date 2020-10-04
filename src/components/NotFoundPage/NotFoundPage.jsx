import React from 'react';
import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div>
      <h2>404 - Not Found</h2>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  );
}

export default NotFoundPage;
