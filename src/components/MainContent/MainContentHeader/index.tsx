import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../../customHook/useWindowSize';
import { setIsContentVisible } from '../../../reudx/modalReducer';
import { setMonthIndex } from '../../../reudx/monthReducer';

const MainContentHeader = () => {
  const dispatch = useDispatch();
  const monthIndex = useSelector(
    (state: RootStateOrAny) => state.month.monthIndex
  );

  const isContentVisible = useSelector(
    (state: RootStateOrAny) => state.modal.isContentVisible
  );

  const { width } = useWindowSize();

  const handlePrevMonth: React.MouseEventHandler<HTMLButtonElement> = () => {
    const action = setMonthIndex({ monthIndex: monthIndex - 1 });
    dispatch(action);
  };

  const handleNextMonth: React.MouseEventHandler<HTMLButtonElement> = () => {
    const action = setMonthIndex({ monthIndex: monthIndex + 1 });
    dispatch(action);
  };

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = () => {
    const action = setMonthIndex({ monthIndex: dayjs().month() });
    dispatch(action);
  };

  const handleBack: React.MouseEventHandler<HTMLButtonElement> = () => {
    const actionContent = setIsContentVisible({ isContentVisible: false });
    dispatch(actionContent);
  };

  return (
    <div>
      <div className="px-4 py-5 flex items-center">
        {!!width && width > 768 ? (
          <>
            <button
              className="rounded-md border border-blue-light text-blue-light px-4 py-1 mr-5"
              onClick={handleReset}
            >
              Today
            </button>
            <button className="w-10" onClick={handlePrevMonth}>
              <ChevronLeftIcon className="cursor-pointer text-blue-light mx-2" />
            </button>
            <button className="w-10" onClick={handleNextMonth}>
              <ChevronRightIcon className="cursor-pointer text-blue-light mx-2 " />
            </button>
          </>
        ) : (
          <button className="w-10" onClick={handleBack}>
            <ChevronLeftIcon className="cursor-pointer text-blue-light mx-2" />
          </button>
        )}

        <h2 className="ml-4 text-xl  font-bold text-blue-light">
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
        </h2>
      </div>
    </div>
  );
};

export default MainContentHeader;
