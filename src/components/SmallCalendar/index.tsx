import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setSmallCalendarMonth } from '../../reudx/monthReducer';
import { getMonth } from '../../utils/day';

import { setDaySelected } from '../../reudx/dayReducer';
import { setIsContentVisible } from '../../reudx/modalReducer';

const SmallCalendar = () => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(
    (state: RootStateOrAny) => state.month.monthIndex
  );
  const daySelected = useSelector(
    (state: RootStateOrAny) => state.day.daySelected
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const handleMoveToMonth = (day: dayjs.Dayjs) => {
    const action = setSmallCalendarMonth({
      smallCalendarMonth: currentMonthIndex,
    });
    const actionDay = setDaySelected({ daySelected: day });
    const actionContent = setIsContentVisible({ isContentVisible: true });
    dispatch(action);
    dispatch(actionDay);
    dispatch(actionContent);
  };

  const getCurrentDatClass = (day: dayjs.Dayjs) => {
    if (!!daySelected) {
      if (dayjs(daySelected).format('DD-MM-YY') === day.format('DD-MM-YY')) {
        return 'bg-blue-light text-white rounded-full text-center';
      }
    }

    return (
      dayjs().format('DD-MM-YY') === day.format('DD-MM-YY') &&
      'bg-blue-dark text-white rounded-full text-center'
    );
  };

  return (
    <div className="p-2">
      <div className="flex justify-center my-2">
        <button className="w-4 text-blue-light" onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </button>
        <p className="text-blue-light font-bold text-xs mx-4 w-20 text-center">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            'MMM YYYY'
          )}
        </p>
        <button className="w-4 text-blue-light" onClick={handleNextMonth}>
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        <div className="text-xs py-1 text-center">Sun</div>
        <div className="text-xs py-1 text-center">Mon</div>
        <div className="text-xs py-1 text-center">Tue</div>
        <div className="text-xs py-1 text-center">Wed</div>
        <div className="text-xs py-1 text-center">Thu</div>
        <div className="text-xs py-1 text-center">Fri</div>
        <div className="text-xs py-1 text-center">Sat</div>

        {currentMonth &&
          currentMonth.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((day, i) => (
                <div key={i} className="p-1">
                  <button
                    className={`py-1 w-8 h-8 ${
                      day.month() !== currentMonthIndex % 12 &&
                      'text-gray-300 text-center text-xs'
                    } ${getCurrentDatClass(day)}`}
                    onClick={() => handleMoveToMonth(day)}
                  >
                    <span className="text-xs">{day.format('D')}</span>
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
