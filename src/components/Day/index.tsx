import dayjs from 'dayjs';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setDaySelected } from '../../reudx/dayReducer';
import { setIsModalVisible } from '../../reudx/modalReducer';
import ModalInfoEvent from '../ModalInfoEvent';

interface DayProps {
  day: dayjs.Dayjs;
  rowIndex: number;
}

const Day: React.FC<DayProps> = ({ day, rowIndex }) => {
  const dispatch = useDispatch();

  const listEvent = useSelector((state: RootStateOrAny) => {
    const a = Object.keys(state.event.listEvent).find(
      (key, index) =>
        dayjs(new Date(key)).format('DD-MM-YY') === day.format('DD-MM-YY')
    );

    return !!a ? state.event.listEvent[a] : undefined;
  });
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const isModalVisible = useSelector(
    (state: RootStateOrAny) => state.modal.isModalVisible
  );
  const monthIndex = useSelector(
    (state: RootStateOrAny) => state.month.monthIndex
  );
  const daySelected = useSelector(
    (state: RootStateOrAny) => state.day.daySelected
  );

  const getCurrentDatClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-dark text-white rounded-full w-7'
      : '';
  };

  const hanleSelectedDay = () => {
    const actionDay = setDaySelected({ daySelected: day });
    const actionModal = setIsModalVisible({ isModalVisible: true });

    dispatch(actionDay);
    dispatch(actionModal);
  };

  const checkDay = (day: dayjs.Dayjs) => {
    if (isModalVisible) {
      if (day.format('DD-MM-YY') === daySelected.format('DD-MM-YY')) {
        return true;
      }
    }
  };

  return (
    <div className="p-1 md:p-0">
      <div
        className={`border border-gray-200 flex flex-col h-32 rounded-lg md:rounded-none`}
        onClick={hanleSelectedDay}
      >
        <div className={`flex flex-col items-center`}>
          <p
            className={`text-sm p-1 my-1 text-center ${getCurrentDatClass()} ${
              day.month() !== monthIndex % 12 && 'text-gray-300'
            }`}
          >
            {day.format('DD')}
          </p>
        </div>

        {listEvent &&
          listEvent.map((item: any, index: number) => (
            <>
              {index < 2 && (
                <>
                  <div
                    key={index}
                    className={`w-full text-xs p-1 bg-orange-light rounded mb-0.5 text-blue-dark font-semibold truncate border-l-4 ${item.data.labelColor.border} cursor-pointer hover:underline`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                  >
                    {item.data.title}
                  </div>
                  <ModalInfoEvent
                    item={item}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                  />
                </>
              )}
            </>
          ))}

        {checkDay(day) && (
          <div className="w-full h-6 bg-orange-light rounded" />
        )}

        {listEvent?.length >= 3 && (
          <div className="text-blue-dark font-semibold text-xs px-1">
            {listEvent?.length - 2} More
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
