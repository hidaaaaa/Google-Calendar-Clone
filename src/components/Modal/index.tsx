import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../reudx/eventsReducer';
import { setIsModalVisible } from '../../reudx/modalReducer';
import AppointmentForm from '../AppointmentForm';
import EventForm from '../EventForm';

const Modal = () => {
  const dispatch = useDispatch();
  const [onToggle, setOnToggle] = useState(true);

  const handleSubmit = (values: object) => {
    console.log(values);
    const action = addEvent({ event: values });
    dispatch(action);
    const actionModal = setIsModalVisible({ isModalVisible: false });
    dispatch(actionModal);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/4">
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div className="flex flex-1">
            <span
              className={`px-2 py-1 ${
                onToggle ? 'bg-blue-dark' : 'bg-blue-light'
              } hover:bg-blue-dark text-white rounded text-xs cursor-pointer mr-1`}
              onClick={() => setOnToggle(true)}
            >
              Appointment
            </span>

            <span
              className={`px-2 py-1 ${
                !onToggle ? 'bg-blue-dark' : 'bg-blue-light'
              } hover:bg-blue-dark text-white rounded text-xs cursor-pointer`}
              onClick={() => setOnToggle(false)}
            >
              Event
            </span>
          </div>

          <div
            className="text-gray-400 h-4 w-auto cursor-pointer"
            onClick={() => {
              const action = setIsModalVisible({ isModalVisible: false });
              dispatch(action);
            }}
          >
            <XIcon className="h-full" />
          </div>
        </div>

        {onToggle ? (
          <AppointmentForm handleSubmit={handleSubmit} />
        ) : (
          <EventForm handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default Modal;
