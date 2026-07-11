import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },

    closeChat: (state) => {
      state.isOpen = false;
    },

    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  openChat,
  closeChat,
  toggleChat,
} = aiSlice.actions;

export default aiSlice.reducer;