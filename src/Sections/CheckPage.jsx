import React from 'react';
import PageNotFound from '../Sections/PageNotFound';

const CheckPage = (Component) => {
  return (props) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      console.error("Error loading page:", error);
      return <PageNotFound />;
    }
  };
};

export default CheckPage;
