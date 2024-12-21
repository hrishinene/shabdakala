// SplashScreen.tsx
import React from 'react';
import './SplashScreen.css'; // Create this CSS file for styling

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-screen">
      <img src="logo512.png" alt="Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;