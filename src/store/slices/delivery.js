import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const createDelivery = createAsyncThunk(
  "createDelivery",
  async (params) => {
    const { data } = await axios.post("/delivery", params);

    return data;
  }
);

export const getAllDelivery = createAsyncThunk("getAllDelivery", async () => {
  const { data } = await axios.get("/delivery");

  return data;
});

export const getOneDelivery = createAsyncThunk("getOneDelivery", async (id) => {
  const { data } = await axios.get(`/delivery/${id}`);

  return data;
});

export const framedDelivery = createAsyncThunk("framedDelivery", async (id) => {
  const { data } = await axios.patch(`/delivery/framed/${id}`);

  return data;
});

export const completedDelivery = createAsyncThunk(
  "completedDelivery",
  async (id) => {
    const { data } = await axios.patch(`/delivery/completed/${id}`);

    return data;
  }
);

export const deleteGoodsInBasket = createAsyncThunk(
  "deleteGoodsInBasket",
  async (id) => {
    const { data } = await axios.patch(`/auth/basket/deleteAll/${id}`);

    return data;
  }
);

const initialState = {
  delivery: {
    data: null,
    status: "loading",
  },
  allDelivery: {
    data: null,
    status: "loading",
  },
  oneDelivery: {
    data: null,
    status: "loading",
  },
  emptyBasket: {
    data: null,
    status: "loading",
  },
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: {
    [createDelivery.pending]: (state) => {
      state.delivery.data = null;
      state.delivery.status = "loading";
    },
    [createDelivery.fulfilled]: (state, action) => {
      state.delivery.data = action.payload;
      state.delivery.status = "loaded";
    },
    [createDelivery.rejected]: (state) => {
      state.delivery.data = null;
      state.delivery.status = "error";
    },
    [getAllDelivery.pending]: (state) => {
      state.allDelivery.data = null;
      state.allDelivery.status = "loading";
    },
    [getAllDelivery.fulfilled]: (state, action) => {
      state.allDelivery.data = action.payload;
      state.allDelivery.status = "loaded";
    },
    [getAllDelivery.rejected]: (state) => {
      state.allDelivery.data = null;
      state.allDelivery.status = "error";
    },
    [getOneDelivery.pending]: (state) => {
      state.oneDelivery.data = null;
      state.oneDelivery.status = "loading";
    },
    [getOneDelivery.fulfilled]: (state, action) => {
      state.oneDelivery.data = action.payload;
      state.oneDelivery.status = "loaded";
    },
    [getOneDelivery.rejected]: (state) => {
      state.oneDelivery.data = null;
      state.oneDelivery.status = "error";
    },
    [deleteGoodsInBasket.pending]: (state) => {
      state.emptyBasket.data = null;
      state.emptyBasket.status = "loading";
    },
    [deleteGoodsInBasket.fulfilled]: (state, action) => {
      state.emptyBasket.data = action.payload;
      state.emptyBasket.status = "loaded";
    },
    [deleteGoodsInBasket.rejected]: (state) => {
      state.emptyBasket.data = null;
      state.emptyBasket.status = "error";
    },
  },
});

export const deliveryReducer = deliverySlice.reducer;
