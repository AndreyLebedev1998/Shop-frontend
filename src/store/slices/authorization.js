import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const authorization = createAsyncThunk("auth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const getAuthMe = createAsyncThunk("getAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  window.localStorage.setItem("auth", JSON.stringify(data._id));
  return data;
});

export const register = createAsyncThunk("register", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOut: (state) => {
      state.data = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [authorization.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [authorization.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [authorization.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [getAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [getAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [getAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [register.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [register.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const { loginOut } = authSlice.actions;

export const authReduced = authSlice.reducer;
