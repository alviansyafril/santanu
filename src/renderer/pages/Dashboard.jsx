import React from 'react';
import MainMap from '../components/MainMap';
import MiniMap from '../components/MiniMap';
import Statistics from '../components/Statistics';

const Dashboard = () => {
  return (
    // <div className="w-screen h-screen grid grid-cols-3 grid-rows-2">
    <div className="w-screen h-screen grid ">
      <MainMap />
      {/* <MiniMap /> */}
      {/* <Statistics /> */}
    </div>
  );
};

export default Dashboard;
