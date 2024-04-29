import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Params {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "users/register",
  async (params: Params) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        params
      );

      return response.data ?? null;
    } catch (error) {
      return error;
    }
  }
);

export const loginUserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default loginUserSlice.reducer;
