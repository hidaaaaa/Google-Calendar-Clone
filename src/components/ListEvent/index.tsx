import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import EventItem from '../EventItem';

dayjs.extend(isSameOrAfter);

const ListEvent = () => {
  const [toggleView, setToggleView] = useState(true);

  const listEvent = useSelector((state: RootStateOrAny) => {
    const a = Object.keys(state.event.listEvent)
      .filter((key: string, index: number) => {
        return dayjs(new Date(key)).isSameOrAfter(
          dayjs(new Date().setHours(0, 0, 0, 0))
        );
      })
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((i) => ({
        [i]: state.event.listEvent[i],
      }));

    return a;
  });

  const listCount = useSelector((state: RootStateOrAny) => {
    const a = Object.keys(state.event.listEvent)
      .filter((key: any, index: number) => {
        return dayjs(new Date(key)).isSameOrAfter(
          dayjs(new Date().setHours(0, 0, 0, 0))
        );
      })
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((i) => state.event.listEvent[i].length);

    return a;
  });

  return (
    <div className="w-full border-t-2 p-2">
      <div className="flex justify-between">
        <span className="font-bold text-blue-dark">Upcoming Events</span>
        <button
          className="px-2 py-1 bg-blue-dark text-white text-xs rounded-xl"
          onClick={() => setToggleView(!toggleView)}
        >
          {toggleView ? 'View All' : 'Hide'}
        </button>
      </div>

      <div>
        {listEvent.length > 0 ? (
          <div>
            {listEvent &&
              listEvent.map((date: any, key: number) => (
                <React.Fragment key={key}>
                  <div>
                    <>
                      <div
                        className={`text-sm text-gray-400 font-semibold ${
                          toggleView && key > 0 && 'hidden'
                        }`}
                      >
                        {dayjs(new Date(Object.keys(date)[0])).format(
                          'DD-MM-YY'
                        ) === dayjs().format('DD-MM-YY') ? (
                          <>
                            Today,{' '}
                            {dayjs(new Date(Object.keys(date)[0])).format(
                              'DD MMM'
                            )}
                          </>
                        ) : (
                          <>
                            {dayjs(new Date(Object.keys(date)[0])).format(
                              'dddd, DD MMM'
                            )}
                          </>
                        )}
                        <div>
                          {date[Object.keys(date)[0]].map(
                            (item: object, index: number) => {
                              if (toggleView) {
                                let count = 0;
                                for (let i = 0; i < key; i++) {
                                  count = count + listCount[i];
                                }
                                console.log(count);

                                if (index + count <= 2) {
                                  return <EventItem data={item} key={index} />;
                                }
                              } else {
                                return <EventItem data={item} key={index} />;
                              }
                            }
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                </React.Fragment>
              ))}
          </div>
        ) : (
          <div className="">No event</div>
        )}
      </div>
    </div>
  );
};

export default ListEvent;
