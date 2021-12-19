const { createSlice } = require('@reduxjs/toolkit');
import dayjs from 'dayjs';

const modalSlice = createSlice({
  name: 'EVENTS',
  initialState: {
    listEvent:
      typeof window !== 'undefined'
        ? localStorage.getItem('listEvent') !== null
          ? JSON.parse(localStorage.getItem('listEvent'))
          : {}
        : {},
  },
  reducers: {
    addEvent(state, action) {
      const eventItem = action.payload;
      const key = eventItem.event.data?.date.format('DD-MMMM-YYYY');

      if (!!state.listEvent[key]) {
        const val = [
          ...state.listEvent[key],
          {
            ...eventItem.event,
            id: state.listEvent[key][state.listEvent[key].length - 1].id + 1,
          },
        ];
        const list = { ...state.listEvent, [key]: val };
        localStorage.setItem('listEvent', JSON.stringify(list));
        state.listEvent = list;
      } else {
        const list = {
          ...state.listEvent,
          [key]: [{ ...eventItem.event, id: 0 }],
        };
        localStorage.setItem('listEvent', JSON.stringify(list));
        state.listEvent = list;
      }
    },
    deleteEvent(state, action) {
      console.log(action.payload);
      const delId = action.payload.id;
      const key = dayjs(new Date(action.payload?.date)).format('DD-MMMM-YYYY');
      if (!!state.listEvent[key]) {
        const val = state.listEvent[key].filter((item) => item.id !== delId);
        if (val.length === 0) {
          const list = { ...state.listEvent };

          delete list[key];
          localStorage.setItem('listEvent', JSON.stringify(list));
          state.listEvent = list;
        } else {
          const list = { ...state.listEvent, [key]: val };

          state.listEvent = list;
        }
      }
    },
  },
});

const { actions, reducer } = modalSlice;
export const { addEvent, changeEvent, deleteEvent } = actions;
export default reducer;
