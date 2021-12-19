import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../reudx/eventsReducer';
import { setIsModalVisible } from '../../reudx/modalReducer';
import AppointmentForm from '../AppointmentForm';
import EventForm from '../EventForm';

const Modal = () => {
  const dispatch = useDispatch();
  const [onToggle, setOnToggle] = useState(true);
  const isModalVisible = useSelector(
    (state: RootStateOrAny) => state.modal.isModalVisible
  );

  const handleSubmit = (values: object) => {
    console.log(values);
    const action = addEvent({ event: values });
    dispatch(action);
    const actionModal = setIsModalVisible({ isModalVisible: false });
    dispatch(actionModal);
  };

  const closeModal = () => {
    const actionModal = setIsModalVisible({ isModalVisible: false });
    dispatch(actionModal);
  };

  return (
    <>
      <Transition appear show={isModalVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white rounded-lg shadow-2xl">
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
                      const action = setIsModalVisible({
                        isModalVisible: false,
                      });
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"></div>
    </>
  );
};

export default Modal;
