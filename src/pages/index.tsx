import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { MainContent, Navbar } from '../components';
import { getMonth } from '../utils/day';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { setMonthIndex } from '../reudx/monthReducer';
import Modal from '../components/Modal';
import useWindowSize from '../customHook/useWindowSize';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const smallCalendarMonth = useSelector(
    (state: RootStateOrAny) => state.month.smallCalendarMonth
  );
  const isModalVisible = useSelector(
    (state: RootStateOrAny) => state.modal.isModalVisible
  );
  const isContentVisible = useSelector(
    (state: RootStateOrAny) => state.modal.isContentVisible
  );
  const monthIndex = useSelector(
    (state: RootStateOrAny) => state.month.monthIndex
  );

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { width } = useWindowSize();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      const action = setMonthIndex({ monthIndex: smallCalendarMonth });
      dispatch(action);
    }
  }, [smallCalendarMonth]);

  return (
    <div className="bg-tile-base min-h-screen">
      <Head>
        <title>Master Branch Interview</title>
        <meta name="description" content="Save code nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        {isModalVisible && <Modal />}

        <div className=" flex flex-col">
          <div className="flex flex-1 px-4 md:px-5 lg:px-20">
            {!!width && width > 768 ? (
              <>
                <div className={`p-2 w-full  md:w-80 `}>
                  <Navbar month={currentMonth} />
                </div>
              </>
            ) : (
              <>
                {!isContentVisible && (
                  <div className={`p-2 w-full  md:w-80 `}>
                    <Navbar month={currentMonth} />
                  </div>
                )}
              </>
            )}

            {!!width && width > 768 ? (
              <>
                <div className={`p-2 flex-1`}>
                  <MainContent month={currentMonth} />
                </div>
              </>
            ) : (
              <>
                {isContentVisible && (
                  <div className={`p-2 flex-1 `}>
                    <MainContent month={currentMonth} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>

      {/* Navbar */}
    </div>
  );
};

export default Home;
