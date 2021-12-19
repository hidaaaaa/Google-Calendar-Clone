const { createSlice } = require('@reduxjs/toolkit');

const modalSlice = createSlice({
  name: 'MODAL_INDEX',
  initialState: {
    isModalVisible: false,
    isContentVisible: false,
  },
  reducers: {
    setIsModalVisible(state, action) {
      const newPhone = action.payload;
      state.isModalVisible = newPhone.isModalVisible;
    },
    setIsContentVisible(state, action) {
      const newPhone = action.payload;
      state.isContentVisible = newPhone.isContentVisible;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { setIsModalVisible, setIsContentVisible } = actions;
export default reducer;
