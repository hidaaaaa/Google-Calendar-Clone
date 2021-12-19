import React from 'react';
import { Day } from '..';
import dayjs from 'dayjs';

interface MonthProps {
  month: dayjs.Dayjs[][];
  sizeClass: string;
}

const Month: React.FC<MonthProps> = ({ month, sizeClass = 'h-8' }) => {
  return (
    <>
      <div className={`grid grid-cols-7 ${sizeClass}`}>
        <div className={`border-gray-200 flex flex-col text-center`}>Sun</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Mon</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Tue</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Wed</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Thu</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Fri</div>
        <div className={`border-gray-200 flex flex-col text-center`}>Sat</div>
      </div>
      <div className=" grid grid-cols-7 grid-rows-5">
        {month &&
          month.map((row, i) => (
            <React.Fragment key={i}>
              {row &&
                row.map((day, index) => (
                  <Day day={day} key={index} rowIndex={i} />
                ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default Month;
