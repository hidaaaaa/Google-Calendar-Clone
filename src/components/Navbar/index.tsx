import dayjs from 'dayjs';
import React from 'react';
import ListEvent from '../ListEvent';
import SmallCalendar from '../SmallCalendar';

interface SideBarProps {
  month: dayjs.Dayjs[][];
}

const Navbar: React.FC<SideBarProps> = () => {
  return (
    <div className="w-full bg-white rounded shadow">
      <SmallCalendar />
      <ListEvent />
    </div>
  );
};

export default Navbar;
