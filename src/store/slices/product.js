import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllGoods = createAsyncThunk("/goods", async () => {
  const { data } = await axios.get("/goods");

  return data;
});

export const getTheBestGoods = createAsyncThunk("/bestGoods", async () => {
  let { data } = await axios.get("/goods");
  /* data = window.localStorage.setItem(
    "products",
    JSON.stringify(data.sort(() => 0.5 - Math.random()).slice(0, 3))
  );
  console.log(data); */
  return data;
});

export const getBasketUser = createAsyncThunk("basketUser", async (id) => {
  const { data } = await axios.get(`/auth/basket/${id}`);
  return data;
});

const initialState = {
  good: {
    data: null,
    status: "loading",
  },
  basket: {
    data: null,
    status: "loading",
  },
  bestGoods: {
    data: null,
    status: "loading",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getBestProducts: (state) => {
      if (state.bestGoods.data !== null) {
        window.localStorage.setItem(
          "products",
          JSON.stringify(
            state.bestGoods.data.sort(() => 0.5 - Math.random()).slice(0, 3)
          )
        );
      }
    },
  },
  extraReducers: {
    [fetchGetAllGoods.pending]: (state) => {
      state.good.status = "loading";
      state.good.data = null;
    },
    [fetchGetAllGoods.fulfilled]: (state, action) => {
      state.good.status = "loaded";
      state.good.data = action.payload;
    },
    [fetchGetAllGoods.rejected]: (state) => {
      state.good.status = "error";
      state.good.data = null;
    },
    [getBasketUser.pending]: (state) => {
      state.basket.status = "loading";
      state.basket.data = null;
    },
    [getBasketUser.fulfilled]: (state, action) => {
      state.basket.status = "loaded";
      state.basket.data = action.payload;
    },
    [getBasketUser.rejected]: (state) => {
      state.basket.status = "error";
      state.basket.data = null;
    },
    [getTheBestGoods.pending]: (state) => {
      state.bestGoods.status = "loading";
      state.bestGoods.data = null;
    },
    [getTheBestGoods.fulfilled]: (state, action) => {
      state.bestGoods.status = "loaded";
      state.bestGoods.data = action.payload;
    },
    [getTheBestGoods.rejected]: (state) => {
      state.bestGoods.status = "error";
      state.bestGoods.data = null;
    },
  },
});

export const productReducer = productSlice.reducer;

export const { getBestProducts } = productSlice.actions;
