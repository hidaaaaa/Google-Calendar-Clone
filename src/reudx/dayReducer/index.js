const { createSlice } = require('@reduxjs/toolkit');
import dayjs from 'dayjs';

const phoneSlice = createSlice({
  name: 'DAY_INDEX',
  initialState: {
    daySelected: null,
    toDaySelected: dayjs(),
  },
  reducers: {
    setDaySelected(state, action) {
      const newPhone = action.payload;
      state.daySelected = newPhone.daySelected;
    },
    setToDaySelected(state, action) {
      const newPhone = action.payload;
      state.toDaySelected = newPhone.toDaySelected;
    },
  },
});

const { actions, reducer } = phoneSlice;
export const { setDaySelected, setToDaySelected } = actions;
export default reducer;
