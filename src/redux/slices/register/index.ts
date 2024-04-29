import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Params {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "users/register",
  async (params: Params) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      params
    );

    return response.data ?? null;
  }
);

const registerUserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default registerUserSlice.reducer;
