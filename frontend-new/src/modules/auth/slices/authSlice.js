// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,

  token: storedToken || null,

  isAuthenticated:
    false
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    setUser: (state, action) => {
		
		console.log("getting action")

      state.user = action.payload.user;
	  console.log("userChecking redux",state.user)

    //   state.token =
    //     action.payload.token;

      state.isAuthenticated =
        true;

      localStorage.setItem(
        "user",
        JSON.stringify(
          action.payload.user
        )
      );

    //   localStorage.setItem(
    //     "token",
    //     action.payload.token
    //   );
    },

    logoutUserRedux: (state) => {
   
      state.user = null;

      state.token = null;

      state.isAuthenticated =
        false;

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );
	   sessionStorage.removeItem(
      "ai-chat-history"
    );
    },
  },
});

export const {
  setUser,
  logoutUserRedux,
} = authSlice.actions;

export default authSlice.reducer;