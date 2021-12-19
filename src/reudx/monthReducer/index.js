const { createSlice } = require('@reduxjs/toolkit');
import dayjs from 'dayjs';

const monthSlice = createSlice({
  name: 'MONTH_INDEX',
  initialState: {
    monthIndex: dayjs().month(),
    smallCalendarMonth: null,
  },
  reducers: {
    setMonthIndex(state, action) {
      const newPhone = action.payload;
      state.monthIndex = newPhone.monthIndex;
    },
    setSmallCalendarMonth(state, action) {
      const newPhone = action.payload;
      state.smallCalendarMonth = newPhone.smallCalendarMonth;
    },
  },
});

const { actions, reducer } = monthSlice;
export const { setMonthIndex, setSmallCalendarMonth } = actions;
export default reducer;
