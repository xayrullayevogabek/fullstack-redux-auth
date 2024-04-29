import { configureStore } from "@reduxjs/toolkit";
import loginUserSlice from "./slices/login";
import registerUserSlice from "./slices/register";

export const store = configureStore({
  reducer: {
    login: loginUserSlice,
    register: registerUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
