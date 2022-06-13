import React from 'react';
import MainMap from '../components/MainMap';
import MiniMap from '../components/MiniMap';
import Statistics from '../components/Statistics';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="w-screen h-screen grid grid-cols-3 grid-rows-2">
        {/* <div className="w-screen h-screen grid "> */}
        <MainMap />
        <MiniMap />
        <Statistics />
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
