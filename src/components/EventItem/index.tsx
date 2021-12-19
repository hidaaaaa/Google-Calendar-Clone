import { VideoCameraIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import ModalInfoEvent from '../ModalInfoEvent';

interface EventItemProps {
  data: any;
}

const EventItem: React.FC<EventItemProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* {data.type === 'appointment' ? ( */}
      <div
        className={`p-4 bg-orange-light mb-2 rounded-md border-l-4 ${data.data.labelColor.border} mt-1 cursor-pointer`}
        onClick={openModal}
      >
        <div className="flex justify-between items-start">
          <div className="w-10/12">
            <div className="text-blue-dark text-sm font-bold mb-1">
              {data.data.title}
            </div>
            <div className="text-xs">
              {data.data.time.from.hour}:
              {data.data.time.from.minute < 10
                ? `0${data.data.time.from.minute}`
                : data.data.time.from.minute}{' '}
              - {data.data.time.to.hour}:
              {data.data.time.to.minute < 10
                ? `0${data.data.time.to.minute}`
                : data.data.time.to.minute}
            </div>
          </div>

          {data.type === 'appointment' ? (
            <VideoCameraIcon className="mt-1 h-8 w-8 bg-blue-light rounded-full text-white p-1" />
          ) : (
            <></>
          )}
        </div>

        <ModalInfoEvent setIsOpen={setIsOpen} isOpen={isOpen} item={data} />
      </div>
      {/* ) : (
        <div></div>
      )} */}
    </>
  );
};

export default EventItem;
