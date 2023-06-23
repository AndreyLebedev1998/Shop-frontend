import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllGoods = createAsyncThunk("/goods", async () => {
  const { data } = await axios.get("/goods");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetAllGoods.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchGetAllGoods.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchGetAllGoods.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const productReducer = productSlice.reducer;
