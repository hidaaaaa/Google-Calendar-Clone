import { BookmarkIcon, ClockIcon, XIcon } from '@heroicons/react/outline';
import { CalendarIcon, CheckIcon, MenuAlt3Icon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { setDaySelected } from '../../reudx/dayReducer';
import InputField from '../InputField';

interface AppointmentFormProps {
  handleSubmit: (values: object) => void;
}

const schema = yup.object().shape({
  title: yup.string().required(),
});

const labelsClasses = [
  { bg: 'bg-indigo-500', border: 'border-indigo-500' },
  { bg: 'bg-gray-500', border: 'border-gray-500' },
  { bg: 'bg-green-500', border: 'border-green-500' },
  { bg: 'bg-blue-500', border: 'border-blue-500' },
  { bg: 'bg-red-500', border: 'border-red-500' },
  { bg: 'bg-purple-500', border: 'border-purple-500' },
];

const AppointmentForm: React.FC<AppointmentFormProps> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const daySelected = useSelector(
    (state: RootStateOrAny) => state.day.daySelected
  );
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
  const [openFromCalendar, setOpenFromCalendar] = useState(false);
  const [fromTime, setFromTime] = useState(
    dayjs().set('hour', 8).set('minute', 0).set('second', 0)
  );
  const [toTime, setToTime] = useState(
    dayjs().set('hour', 9).set('minute', 0).set('second', 0)
  );

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleChangeFromDay = (values: Date) => {
    const action = setDaySelected({ daySelected: dayjs(values) });
    dispatch(action);
    setOpenFromCalendar(false);
  };

  const handleSubmitForm = (values: object) => {
    const data = {
      data: {
        ...values,
        labelColor: selectedLabel,
        date: daySelected,
        time: {
          from: {
            hour: fromTime.hour(),
            minute: fromTime.minute(),
          },
          to: {
            hour: toTime.hour(),
            minute: toTime.minute(),
          },
        },
      },
      type: 'appointment',
    };
    if (handleSubmit) {
      handleSubmit(data);
    }
  };

  const onChangeFromTime = (value: any) => {
    if (!!value) {
      setFromTime(dayjs(value));
    } else {
      setFromTime(dayjs().set('hour', 8).set('minute', 0).set('second', 0));
    }
  };

  const onChangeToTime = (value: any) => {
    if (!!value) {
      setToTime(dayjs(value));
    } else {
      setToTime(dayjs().set('hour', 9).set('minute', 0).set('second', 0));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmitForm)} className="w-full">
      <div className="p-3">
        <div className="grid grid-cols-1/5 items-end gap-y-7">
          <div className=""></div>

          <InputField
            form={form}
            name="title"
            label=""
            disabled={false}
            placeholder="Add title"
            defaultValue=""
          />

          <CalendarIcon className="max-h-6 text-gray-400" />

          <p
            className="relative flex justify-between text-blue-dark font-bold text-sm hover:underline cursor-pointer"
            onClick={() => {
              setOpenFromCalendar(!openFromCalendar);
            }}
          >
            {daySelected && daySelected.format('dddd, MMMM DD')}

            <div
              className={`absolute shadow-2xl rounded py-4 ${
                !openFromCalendar ? 'hidden' : 'top-4 z-50'
              }`}
            >
              <div className="flex justify-end w-100 p-3  bg-gray-100 border-t border-l border-r border-gray-600">
                <div
                  className="text-gray-400 h-4 w-auto"
                  onClick={() => {
                    setOpenFromCalendar(!openFromCalendar);
                  }}
                >
                  <XIcon className="h-full" />
                </div>
              </div>
              <Calendar
                onChange={handleChangeFromDay}
                value={new Date(!!daySelected && daySelected)}
              />
            </div>
          </p>

          <ClockIcon className="max-h-6 text-gray-400" />
          <div className="flex justify-between">
            <TimePicker
              showSecond={false}
              minuteStep={15}
              onChange={onChangeFromTime}
              value={moment(fromTime.toDate())}
              className="w-1/3"
            />
            <span>-</span>
            <TimePicker
              showSecond={false}
              minuteStep={15}
              onChange={onChangeToTime}
              disabledHours={() => {
                const hour = fromTime.hour();
                const arr = [];
                for (let i = 0; i <= hour; i++) {
                  arr.push(i);
                }

                return arr;
              }}
              value={moment(toTime.toDate())}
              className="w-1/3"
            />
          </div>

          <MenuAlt3Icon className="max-h-6 text-gray-400" />
          <InputField
            form={form}
            name="description"
            label=""
            disabled={false}
            placeholder="Add description"
            defaultValue=""
          />

          <BookmarkIcon className="max-h-6 text-gray-400" />
          <div className="flex gap-x-2">
            {labelsClasses.map((labelClass: any, index) => (
              <span
                key={index}
                className={`${labelClass.bg}  w-6 rounded-full flex items-center justify-center cursor-pointer h-6`}
                onClick={() => setSelectedLabel(labelClass)}
              >
                {labelClass.bg === selectedLabel.bg && (
                  <CheckIcon className="max-h-6 text-white" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end w-100 border-t p-3 mt-5">
        <button
          type="submit"
          className="bg-blue-light hover:bg-blue-dark hover: px-6 py-2 rounded text-white "
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
