import dayjs from 'dayjs';
import React from 'react';
import Month from '../Month';
import MainContentHeader from './MainContentHeader';

interface MainContentProps {
  month: dayjs.Dayjs[][];
}

const MainContent: React.FC<MainContentProps> = ({ month }) => {
  return (
    <div className="w-full h-full bg-white rounded shadow">
      <MainContentHeader />

      <Month month={month} sizeClass="" />
    </div>
  );
};

export default MainContent;
