import React, { VoidFunctionComponent } from 'react';
import MainScreen from './components/MainScreen';

const MainLayout: VoidFunctionComponent = () => {
  return (
    <div className="container">
      <h1 className="text-center">VidNoter</h1>

      <MainScreen />
    </div>
  );
};

export default MainLayout;
